const express = require("express");
const prisma = require("../lib/prisma");
const stripe = require("../lib/stripe");

const router = express.Router();

// POST /api/webhook/stripe - Stripe webhook (must receive raw body, mounted before json() parser)
router.post("/stripe", express.raw({ type: "application/json" }), async (req, res) => {
  const sig = req.headers["stripe-signature"];
  let event;

  try {
    event = stripe.webhooks.constructEvent(req.body, sig, process.env.STRIPE_WEBHOOK_SECRET);
  } catch (err) {
    console.error("Webhook signature verification failed:", err.message);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  try {
    if (event.type === "checkout.session.completed") {
      const session = event.data.object;
      const orderId = session.metadata?.orderId;

      if (orderId) {
        const order = await prisma.order.update({
          where: { id: orderId },
          data: {
            status: "PAID",
            stripePaymentIntentId: session.payment_intent || null,
          },
          include: { items: true },
        });

        // decrement stock for each item
        for (const item of order.items) {
          if (item.productId) {
            await prisma.product.update({
              where: { id: item.productId },
              data: { stock: { decrement: item.quantity } },
            });
          }
        }
      }
    } else if (event.type === "checkout.session.expired") {
      const session = event.data.object;
      const orderId = session.metadata?.orderId;
      if (orderId) {
        await prisma.order.update({
          where: { id: orderId },
          data: { status: "FAILED" },
        });
      }
    }

    res.json({ received: true });
  } catch (err) {
    console.error("Error handling webhook event:", err);
    res.status(500).json({ error: "Webhook handler failed" });
  }
});

module.exports = router;
