const { Category } = require("../models");
const { Op } = require("sequelize");

module.exports = {
  async listAll(req, res) {
    try {
      const categories = await Category.findAll();
      res.status(200).json(categories);
    } catch (err) {
      res.status(500).json({ error: "Erro ao buscar categorias" });
    }
  },

  async search(req, res) {
    let { limit = 12, page = 1, fields, use_in_menu } = req.query;
    limit = parseInt(limit);
    page = parseInt(page);
    const where = {};
    if (use_in_menu !== undefined) where.use_in_menu = use_in_menu === "true";
    const attributes = fields ? fields.split(",") : undefined;
    let options = { where };
    if (attributes) options.attributes = attributes;
    if (limit !== -1) {
      options.limit = limit;
      options.offset = (page - 1) * limit;
    }
    try {
      const { rows, count } = await Category.findAndCountAll(options);
      res.status(200).json({ data: rows, total: count, limit, page });
    } catch (err) {
      res.status(500).json({ error: "Erro ao buscar categorias" });
    }
  },

  async getById(req, res) {
    try {
      const category = await Category.findByPk(req.params.id);
      if (!category)
        return res.status(404).json({ error: "Categoria não encontrada" });
      res.status(200).json(category);
    } catch (err) {
      res.status(500).json({ error: "Erro ao buscar categoria" });
    }
  },

  async create(req, res) {
    const { name, slug, use_in_menu } = req.body;
    if (!name || !slug)
      return res.status(400).json({ error: "Dados inválidos" });
    try {
      const category = await Category.create({ name, slug, use_in_menu });
      res.status(201).json(category);
    } catch (err) {
      res.status(400).json({ error: "Erro ao cadastrar categoria" });
    }
  },

  async update(req, res) {
    const { name, slug, use_in_menu } = req.body;

    if (!name || !slug)
      return res.status(400).json({ error: "Dados de categoria inválidos" });

    try {
      const [updated] = await Category.update(
        { name, slug, use_in_menu },
        { where: { id: req.params.id } }
      );

      if (!updated)
        return res.status(404).json({ error: "Categoria não encontrada" });

      res.status(204).send();
    } catch (err) {
      res.status(500).json({ error: "Erro ao atualizar categoria" });
    }
  },

  async delete(req, res) {
    try {
      const category = await Category.findByPk(req.params.id);
      if (!category)
        return res.status(404).json({ error: "Categoria não encontrada" });
      // Verifica se existe associação com algum produto usando o alias correto
      if (category.getProducts) {
        const products = await category.getProducts();
        if (products && products.length > 0) {
          return res.status(400).json({
            error: "Categoria associada a produto não pode ser excluída",
          });
        }
      }
      await category.destroy();
      res.status(204).send();
    } catch (err) {
      res.status(500).json({ error: "Erro ao deletar categoria" });
    }
  },
};
