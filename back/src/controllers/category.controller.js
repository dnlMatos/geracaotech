import Category from "../models/Category.js";

// Listar todas as categorias
export const getAllCategories = async (req, res) => {
  try {
    const categories = await Category.findAll();
    res.status(200).json(categories);
  } catch (error) {
    res.status(500).json({ error: "Erro ao buscar categorias." });
  }
};

// Buscar categoria por ID
export const getCategoryById = async (req, res) => {
  try {
    const { id } = req.params;
    const category = await Category.findByPk(id);
    if (!category) {
      return res.status(404).json({ error: "Categoria não encontrada." });
    }
    res.status(200).json(category);
  } catch (error) {
    res.status(500).json({ error: "Erro ao buscar categoria." });
  }
};

// Criar nova categoria
export const createCategory = async (req, res) => {
  try {
    const { name, slug, use_in_menu } = req.body;
    const newCategory = await Category.create({ name, slug, use_in_menu });
    res.status(201).json(newCategory);
  } catch (error) {
    res.status(500).json({ error: "Erro ao criar categoria." });
  }
};

// Atualizar categoria
export const updateCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, slug, use_in_menu } = req.body;
    const category = await Category.findByPk(id);

    if (!category) {
      return res.status(404).json({ error: "Categoria não encontrada." });
    }
    await category.update({ name, slug, use_in_menu });
    res.status(200).json(category);
  } catch (error) {
    res.status(500).json({ error: "Erro ao atualizar categoria." });
  }
};

// Deletar categoria
export const deleteCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const category = await Category.findByPk(id);
    if (!category) {
      return res.status(404).json({ error: "Categoria não encontrada." });
    }
    await category.destroy();
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: "Erro ao deletar categoria." });
  }
};
