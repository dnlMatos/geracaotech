import express from "express";
import cors from "cors";
import route from "./src/routes/route.js";

const app = express();
app.use(express.json());
app.use(cors());

const PORT = 3306;

app.listen(PORT, () => {
  console.log(`Server is running in http://localhost:${PORT}`);
});

app.get("/", (req, res) => {
  res.send("starting project");
});

app.use("/api", route);

export default app;
