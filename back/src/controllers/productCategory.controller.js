import ProductCategory from "../models/ProductCategory.js";
import { Op, where } from "sequelize";

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
    // const { id } = req.params;
    // const productCategory = await ProductCategory.findByPk(id);
    // if (!productCategory) {
    //   return res
    //     .status(404)
    //     .json({ message: "Relacionamento não encontrado." });
    // }
    // res.status(200).json(productCategory);
  } catch (error) {
    res.status(500).json({ message: "Erro ao buscar relacionamento." });
  }
};

// Criar novo relacionamento produto-categoria
export const createProductCategory = async (product_id, category_ids) => {
  try {
    // Busca relacionamentos já existentes
    const existingRelations = await ProductCategory.findAll({
      where: {
        product_id: product_id,
        category_id: {
          [Op.in]: category_ids,
        },
      },
      attributes: ["category_id"],
    });

    const existingCategoryIds = existingRelations.map((rel) => rel.category_id);

    const categoriesToInsert = category_ids.filter(
      (id) => !existingCategoryIds.includes(id)
    );

    if (categoriesToInsert.length === 0) {
      throw new Error("Todos os relacionamentos já existem.");
    }

    // if (existingRelations > 0)
    //   return { message: "Um ou mais relacionamento(s) já existe(m)" };

    // Cria os relacionamentos (um para cada categoria)
    const createdRelations = await Promise.all(
      category_ids.map((categoryId) =>
        ProductCategory.create({
          product_id: product_id,
          category_id: categoryId,
        })
      )
    );

    return {
      // categories: createdRelations,
      // message: "Relacionamento(s) criado(s) com sucesso",
    };
  } catch (error) {
    throw new Error(error.message || "Erro ao criar relacionamento.");
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
