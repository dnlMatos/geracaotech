const productDB = require("../services/productDB");
class ProductController {
  async listAll(req, res) {
    try {
      const products = await productDB.FindAll();
      res.status(200).json(products);
    } catch (error) {
      res.status(500).json({ error: error || "Erro ao buscar produtos" });
    }
  }
}

module.exports = new ProductController();
