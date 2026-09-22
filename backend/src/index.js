require("dotenv").config();

const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");

const webhookRouter = require("./routes/webhook");
const productsRouter = require("./routes/products");
const categoriesRouter = require("./routes/categories");
const ordersRouter = require("./routes/orders");
const authRouter = require("./routes/auth");
const { notFoundHandler, errorHandler } = require("./middleware/errorHandler");

const app = express();

app.use(helmet());
app.use(morgan("combined"));
app.use(
  cors({
    origin: process.env.CORS_ORIGIN || "*",
  })
);

// Stripe webhook needs the raw request body, so it's mounted before express.json()
app.use("/api/webhook", webhookRouter);

app.use(express.json({ limit: "2mb" }));

app.get("/api/health", (req, res) => res.json({ status: "ok" }));

app.use("/api/products", productsRouter);
app.use("/api/categories", categoriesRouter);
app.use("/api/orders", ordersRouter);
app.use("/api/auth", authRouter);

app.use(notFoundHandler);
app.use(errorHandler);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Backend listening on port ${PORT}`);
});
