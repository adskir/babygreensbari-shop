const express = require("express");
const { PrismaClient } = require("@prisma/client");

const router = express.Router();
const prisma = new PrismaClient();

router.post("/", async (req, res, next) => {
  try {
    const { name, email, message } = req.body || {};
    if (!name || !email || !message) {
      return res.status(400).json({ error: "Nome, email e messaggio sono obbligatori." });
    }
    const saved = await prisma.contactMessage.create({
      data: { name: String(name).slice(0, 200), email: String(email).slice(0, 200), message: String(message).slice(0, 5000) },
    });
    res.status(201).json({ id: saved.id });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
