const express = require("express");
const { z } = require("zod");
const prisma = require("../lib/prisma");
const { requireAdmin } = require("../middleware/auth");

const router = express.Router();

const productSchema = z.object({
  name: z.string().min(1),
  slug: z
    .string()
    .min(1)
    .regex(/^[a-z0-9]+(-[a-z0-9]+)*$/, "slug must be lowercase-kebab-case"),
  description: z.string().optional().default(""),
  price: z.number().int().nonnegative(),
  currency: z.string().optional().default("eur"),
  stock: z.number().int().nonnegative().optional().default(0),
  images: z.array(z.string().url()).optional().default([]),
  isActive: z.boolean().optional().default(true),
  categoryId: z.string().uuid().nullable().optional(),
});

// GET /api/products - public list with filter/search/pagination
router.get("/", async (req, res, next) => {
  try {
    const {
      q,
      category, // category slug
      minPrice,
      maxPrice,
      page = "1",
      pageSize = "20",
      sort = "newest",
    } = req.query;

    const where = { isActive: true };

    if (q) {
      where.OR = [
        { name: { contains: String(q), mode: "insensitive" } },
        { description: { contains: String(q), mode: "insensitive" } },
      ];
    }

    if (category) {
      where.category = { slug: String(category) };
    }

    if (minPrice || maxPrice) {
      where.price = {};
      if (minPrice) where.price.gte = Number(minPrice);
      if (maxPrice) where.price.lte = Number(maxPrice);
    }

    const pageNum = Math.max(1, parseInt(page, 10) || 1);
    const pageSizeNum = Math.min(100, Math.max(1, parseInt(pageSize, 10) || 20));

    const orderBy =
      sort === "price_asc"
        ? { price: "asc" }
        : sort === "price_desc"
        ? { price: "desc" }
        : sort === "name"
        ? { name: "asc" }
        : { createdAt: "desc" };

    const [items, total] = await Promise.all([
      prisma.product.findMany({
        where,
        orderBy,
        skip: (pageNum - 1) * pageSizeNum,
        take: pageSizeNum,
        include: { category: true },
      }),
      prisma.product.count({ where }),
    ]);

    res.json({
      items,
      total,
      page: pageNum,
      pageSize: pageSizeNum,
      totalPages: Math.ceil(total / pageSizeNum),
    });
  } catch (err) {
    next(err);
  }
});

// GET /api/products/:slug - public single product by slug
router.get("/:slug", async (req, res, next) => {
  try {
    const product = await prisma.product.findUnique({
      where: { slug: req.params.slug },
      include: { category: true },
    });
    if (!product || !product.isActive) {
      return res.status(404).json({ error: "Product not found" });
    }
    res.json(product);
  } catch (err) {
    next(err);
  }
});

// --- Admin routes ---

// GET /api/products/admin/all - admin list including inactive
router.get("/admin/all", requireAdmin, async (req, res, next) => {
  try {
    const products = await prisma.product.findMany({
      orderBy: { createdAt: "desc" },
      include: { category: true },
    });
    res.json(products);
  } catch (err) {
    next(err);
  }
});

// POST /api/products - admin only, create
router.post("/", requireAdmin, async (req, res, next) => {
  try {
    const data = productSchema.parse(req.body);
    const product = await prisma.product.create({ data });
    res.status(201).json(product);
  } catch (err) {
    next(err);
  }
});

// PUT /api/products/:id - admin only, update
router.put("/:id", requireAdmin, async (req, res, next) => {
  try {
    const data = productSchema.partial().parse(req.body);
    const product = await prisma.product.update({
      where: { id: req.params.id },
      data,
    });
    res.json(product);
  } catch (err) {
    next(err);
  }
});

// DELETE /api/products/:id - admin only
router.delete("/:id", requireAdmin, async (req, res, next) => {
  try {
    await prisma.product.delete({ where: { id: req.params.id } });
    res.status(204).send();
  } catch (err) {
    next(err);
  }
});

module.exports = router;
