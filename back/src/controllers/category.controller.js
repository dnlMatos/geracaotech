const categoryDB = require("../services/categoryDB");
class CategoryController {
  async listAll(req, res) {
    try {
      const categories = await categoryDB.FindAll();
      res.status(200).json(categories);
    } catch (error) {
      res.status(500).json({ error: error || "Erro ao buscar categorias" });
    }
  }

  async getById(req, res) {
    try {
      const category = await categoryDB.FindById(req.params.id);
      if (!category) {
        return res.status(404).json({ error: "Categoria não encontrada" });
      }
      res.status(200).json(category);
    } catch (err) {
      res.status(500).json({ error: "Erro ao buscar categoria" });
    }
  }

  async create(req, res) {
    const { name, slug, use_in_menu } = req.body;

    if (!name || !slug || use_in_menu === undefined) {
      return res.status(400).json({ error: "Dados inválidos" });
    }

    try {
      const newCategory = await categoryDB.Create({ name, slug, use_in_menu });
      res.status(201).json(newCategory);
    } catch (err) {
      res.status(500).json({ error: "Erro ao criar categoria" });
    }
  }

  async update(req, res) {
    const { id } = req.params;
    const { name, slug, use_in_menu } = req.body;

    if (!name || !slug || use_in_menu === undefined) {
      return res.status(400).json({ error: "Dados inválidos" });
    }

    try {
      const category = await categoryDB.FindById(id);
      if (!category) {
        return res.status(404).json({ error: "Categoria não encontrada" });
      }

      const dataUpdated = {
        name: name ? name : category.name,
        slug: slug ? slug : category.slug,
        use_in_menu: use_in_menu ? use_in_menu : category.use_in_menu,
      };

      category.set(dataUpdated);
      await category.save();
      res.status(200).json(category);
    } catch (err) {
      res.status(500).json({ error: "Erro ao atualizar categoria" });
    }
  }

  async delete(req, res) {
    try {
      const category = await categoryDB.FindById(req.params.id);
      if (!category) {
        return res.status(404).json({ error: "Categoria não encontrada" });
      }

      await category.destroy();
      res.status(200).json({ message: "Categoria deletada com sucesso" });
    } catch (err) {
      res.status(500).json({ error: "Erro ao deletar categoria" });
    }
  }
}

module.exports = new CategoryController();
