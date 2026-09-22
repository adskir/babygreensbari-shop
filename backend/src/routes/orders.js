const express = require("express");
const { z } = require("zod");
const prisma = require("../lib/prisma");
const stripe = require("../lib/stripe");
const { requireAdmin } = require("../middleware/auth");

const router = express.Router();

const checkoutSchema = z.object({
  email: z.string().email(),
  fullName: z.string().min(1),
  address: z.string().min(1),
  city: z.string().min(1),
  postalCode: z.string().min(1),
  country: z.string().min(1),
  items: z
    .array(
      z.object({
        productId: z.string().uuid(),
        quantity: z.number().int().positive(),
      })
    )
    .min(1),
});

// POST /api/orders/checkout - create order (PENDING) + Stripe checkout session
router.post("/checkout", async (req, res, next) => {
  try {
    const data = checkoutSchema.parse(req.body);

    const productIds = data.items.map((i) => i.productId);
    const products = await prisma.product.findMany({
      where: { id: { in: productIds }, isActive: true },
    });

    if (products.length !== productIds.length) {
      return res.status(400).json({ error: "One or more products are unavailable" });
    }

    const productById = Object.fromEntries(products.map((p) => [p.id, p]));

    for (const item of data.items) {
      const product = productById[item.productId];
      if (product.stock < item.quantity) {
        return res.status(400).json({ error: `Insufficient stock for ${product.name}` });
      }
    }

    const orderItemsData = data.items.map((item) => {
      const product = productById[item.productId];
      return {
        productId: product.id,
        nameSnap: product.name,
        priceSnap: product.price,
        quantity: item.quantity,
      };
    });

    const total = orderItemsData.reduce((sum, i) => sum + i.priceSnap * i.quantity, 0);

    const order = await prisma.order.create({
      data: {
        email: data.email,
        fullName: data.fullName,
        address: data.address,
        city: data.city,
        postalCode: data.postalCode,
        country: data.country,
        total,
        status: "PENDING",
        items: { create: orderItemsData },
      },
      include: { items: true },
    });

    const frontendUrl = process.env.FRONTEND_URL || "http://localhost:5173";

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      customer_email: data.email,
      line_items: order.items.map((item) => ({
        price_data: {
          currency: "eur",
          product_data: { name: item.nameSnap },
          unit_amount: item.priceSnap,
        },
        quantity: item.quantity,
      })),
      success_url: `${frontendUrl}/checkout/success?order=${order.id}`,
      cancel_url: `${frontendUrl}/checkout/cancel?order=${order.id}`,
      metadata: { orderId: order.id },
    });

    await prisma.order.update({
      where: { id: order.id },
      data: { stripeSessionId: session.id },
    });

    res.status(201).json({ orderId: order.id, checkoutUrl: session.url });
  } catch (err) {
    next(err);
  }
});

// GET /api/orders/:id - public order status lookup (for success page)
router.get("/:id", async (req, res, next) => {
  try {
    const order = await prisma.order.findUnique({
      where: { id: req.params.id },
      include: { items: true },
    });
    if (!order) return res.status(404).json({ error: "Order not found" });
    res.json(order);
  } catch (err) {
    next(err);
  }
});

// --- Admin routes ---

// GET /api/orders - admin list all orders
router.get("/", requireAdmin, async (req, res, next) => {
  try {
    const orders = await prisma.order.findMany({
      orderBy: { createdAt: "desc" },
      include: { items: true },
    });
    res.json(orders);
  } catch (err) {
    next(err);
  }
});

// PUT /api/orders/:id/status - admin update order status
router.put("/:id/status", requireAdmin, async (req, res, next) => {
  try {
    const schema = z.object({
      status: z.enum(["PENDING", "PAID", "FAILED", "SHIPPED", "CANCELLED"]),
    });
    const { status } = schema.parse(req.body);
    const order = await prisma.order.update({
      where: { id: req.params.id },
      data: { status },
    });
    res.json(order);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
