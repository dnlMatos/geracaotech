import ProductCategory from "../models/ProductCategory.js";

// Listar todos os relacionamentos produto-categoria
export const getAllProductCategories = async (req, res) => {
  try {
    const productCategories = await ProductCategory.findAll();

    if (productCategories.length === 0) {
      return res
        .status(404)
        .json({ message: "Nenhum relacionamento encontrado." });
    }

    res.status(200).json(productCategories);
  } catch (error) {
    res.status(500).json({
      error:
        error.message || "Erro ao buscar relacionamentos produto-categoria.",
    });
  }
};

// Buscar relacionamento por ID
export const getProductCategoryById = async (req, res) => {
  try {
    const { id } = req.params;
    const productCategory = await ProductCategory.findByPk(id);

    if (!productCategory) {
      return res
        .status(404)
        .json({ message: "Relacionamento não encontrado." });
    }

    res.status(200).json(productCategory);
  } catch (error) {
    res.status(500).json({ message: "Erro ao buscar relacionamento." });
  }
};

// Criar novo relacionamento produto-categoria
export const createProductCategory = async (req, res) => {
  try {
    const { product_id, category_id } = req.body;
    if (!product_id || !category_id) {
      return res
        .status(400)
        .json({ message: "Produto e/ou categoria não fornecidos." });
    }

    // Verifica se o relacionamento já existe
    const existingRelation = await ProductCategory.findOne({
      where: { product_id, category_id },
    });

    if (existingRelation) {
      return res.status(409).json({ message: "Relacionamento já existe." });
    }

    const newProductCategory = await ProductCategory.create({
      product_id,
      category_id,
    });
    res.status(201).json({
      ProductCategory: newProductCategory,
      message: "Relacionamento criado com sucesso",
    });
  } catch (error) {
    res.status(500).json({ message: "Erro ao criar relacionamento." });
  }
};

// Atualizar relacionamento produto-categoria
export const updateProductCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const { product_id, category_id } = req.body;

    if (!product_id || !category_id) {
      return res.status(400).json({
        message: "Produto e/ou categoria não fornecidos.",
      });
    }

    const productCategory = await ProductCategory.findByPk(id);

    if (!productCategory) {
      return res
        .status(404)
        .json({ message: "Relacionamento não encontrado." });
    }

    // Verifica se o relacionamento já existe
    const existingRelation = await ProductCategory.findOne({
      where: { product_id, category_id },
    });

    if (existingRelation) {
      return res.status(409).json({ message: "Relacionamento já existe." });
    }

    await productCategory.update({ product_id, category_id });
    return res.status(200).json({
      ProductCategory: productCategory,
      message: "Relacionamento atualizado com sucesso",
    });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Erro ao atualizar relacionamento." });
  }
};

// Deletar relacionamento produto-categoria
export const deleteProductCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const productCategory = await ProductCategory.findByPk(id);

    if (!productCategory) {
      return res
        .status(404)
        .json({ message: "Relacionamento não encontrado." });
    }

    await productCategory.destroy();
    return res
      .status(202)
      .send({ message: "Relacionamento deletado com sucesso" });
  } catch (error) {
    return res.status(500).json({ message: "Erro ao deletar relacionamento." });
  }
};
