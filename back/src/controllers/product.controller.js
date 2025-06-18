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

  async create(req, res) {
    try {
      const { data } = req.body;

      const product = await productDB.Create(data);

      res.status(201).json(product);
    } catch (error) {
      res.status(500).json({ error: error || "Erro ao criar produto" });
    }
  }

  async delete(req, res) {
    try {
      const { id } = req.params;
      if (!id) {
        return res.status(400).json({ error: "ID do produto é obrigatório" });
      }
      await productDB.Delete(id);
      res.status(204).send({ Message: "Produto excluído com sucesso" });
    } catch (error) {
      res.status(500).json({ error: error || "Erro ao deletar produto" });
    }
  }
}

module.exports = new ProductController();
