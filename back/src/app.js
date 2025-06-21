require("dotenv").config();
const express = require("express");
const app = express();
const userRoutes = require("./routes/user.route.js");
const categoryRoutes = require("./routes/category.route");
const productRoutes = require("./routes/product.route");

app.use(express.json());

app.use("/users", userRoutes);
app.use("/categories", categoryRoutes);
app.use("/products", productRoutes);

app.use((err, req, res, next) => {
  res.status(500).json({ error: "Erro interno do servidor" });
});

module.exports = app;
