import { sequelize } from "./models/index.js";
import express from "express";
import cors from "cors";
import routes from "./routes/route.js";
import app from "../index.js";

const PORT = process.env.PORT || 3000;

sequelize.sync().then(() => {
  app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
  });
});
