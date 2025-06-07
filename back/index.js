import express from "express";
import cors from "cors";
import { categoryRoute } from "./src/routes/categoryRoute.js";
import { productRoute } from "./src/routes/productRoute.js";
import { userRoute } from "./src/routes/userRoute.js";

const app = express();
app.use(express.json());
app.use(cors());

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Server is running in http://localhost:${PORT}`);
});

app.get("/", (req, res) => {
  res.send("starting project");
});

app.use("/categories", categoryRoute);
app.use("/products", productRoute);
app.use("/users", userRoute);

export default app;
