const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  if (["POST", "PUT", "DELETE"].includes(req.method)) {
    const authHeader = req.headers["authorization"];
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(400).json({ error: "Token não fornecido" });
    }
    const token = authHeader.split(" ")[1];
    try {
      req.user = jwt.verify(token, process.env.JWT_SECRET);
      next();
    } catch (err) {
      return res.status(400).json({ error: "Token inválido" });
    }
  } else {
    next();
  }
};
