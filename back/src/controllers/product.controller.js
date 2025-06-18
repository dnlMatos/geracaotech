const productDB = require("../services/productDB");

class ProductController {
  async listAll(req, res) {
    try {
      const products = await productDB.FindAll();
      res.status(200).json({ product: products });
    } catch (error) {
      res.status(500).json({ error: error || "Erro ao buscar produtos" });
    }
  }

  async create(req, res) {
    try {
      const { category_ids, ...data } = req.body;

      const product = await productDB.Create(data);

      // Popula a tabela pivô usando a função auxiliar do Sequelize
      if (category_ids && Array.isArray(category_ids)) {
        await product.setProduct_categories(category_ids);
      }

      res.status(201).json(product);
    } catch (error) {
      res.status(500).json({ error: error || "Erro ao criar produto" });
    }
  }

  async update(req, res) {
    try {
      const { id } = req.params;
      const { category_ids, ...data } = req.body;

      // Busca o produto pelo ID
      const product = await productDB.FindById(id);
      if (!product) {
        return res.status(404).json({ error: "Produto não encontrado" });
      }

      // Atualiza os dados do produto
      await product.update(data);

      // Atualiza as categorias associadas na tabela pivô
      if (category_ids && Array.isArray(category_ids)) {
        await product.setProduct_categories(category_ids);
      }

      res.status(200).json(product);
    } catch (error) {
      res
        .status(500)
        .json({ error: error.message || "Erro ao atualizar produto" });
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
