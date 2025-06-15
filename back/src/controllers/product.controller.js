import Product from "../models/Product.js";
import ProductCategory from "../models/ProductCategory.js";
import Category from "../models/Category.js";

export const getAllProducts = async (req, res) => {
  try {
    // Definindo relações N:N (garante no runtime da função)
    Product.belongsToMany(Category, {
      through: ProductCategory,
      foreignKey: "product_id",
      otherKey: "category_id",
    });
    Category.belongsToMany(Product, {
      through: ProductCategory,
      foreignKey: "category_id",
      otherKey: "product_id",
    });

    // Consulta trazendo todos os produtos com todas as categorias associadas
    const data = await Product.findAll({
      include: [
        {
          model: Category,
          through: {
            attributes: ["id", "product_id", "category_id"], // traz todos os campos da ProductCategory se quiser, ou [] se não quiser nada
          },
        },
      ],
    });

    return res.json({ data });
  } catch (error) {
    res
      .status(400)
      .json({ message: error.message || "Erro ao buscar produtos." });
  }
};

// Buscar produto por ID
export const getProductById = async (req, res) => {
  try {
    const { id } = req.params;

    // Definindo relações N:N (garante no runtime da função)
    Product.belongsToMany(Category, {
      through: ProductCategory,
      foreignKey: "product_id",
      otherKey: "category_id",
    });
    Category.belongsToMany(Product, {
      through: ProductCategory,
      foreignKey: "category_id",
      otherKey: "product_id",
    });

    // Consulta trazendo o produto por ID com as categorias associadas
    const product = await Product.findByPk(id, {
      include: [
        {
          model: Category,
          through: {
            attributes: ["id", "product_id", "category_id"], // ou [] se não quiser a junção
          },
        },
      ],
    });

    if (!product) {
      return res.status(404).json({ message: "Produto não encontrado." });
    }

    return res.json({ data: product });
  } catch (error) {
    res
      .status(400)
      .json({ message: error.message || "Erro ao buscar produto." });
  }
};

// Criar novo product
export const createProduct = async (req, res) => {
  try {
    Product.belongsToMany(Category, {
      through: ProductCategory,
      foreignKey: "product_id",
      otherKey: "category_id",
    });

    const { category_ids, ...body } = req.body;

    let product = await Product.create(body, {
      include: {
        through: ProductCategory,
        model: Category,
      },
    });

    product.setCategories(category_ids);

    return res.status(201).json({
      data: product,
      message: "Produto criado com sucesso",
    });
  } catch (error) {
    if (error.name === "SequelizeUniqueConstraintError") {
      return res
        .status(400)
        .json({ message: "Já existe um produto com esse slug." });
    }

    console.error("Erro ao criar produto:", error);
    return res.status(500).json({
      message: "Erro interno ao criar produto.",
      details: error,
    });
  }
};

// Atualizar produto
export const updateProduct = async (req, res) => {
  try {
    // Definindo a relação N:N no runtime (se não estiver no model)
    Product.belongsToMany(Category, {
      through: ProductCategory,
      foreignKey: "product_id",
      otherKey: "category_id",
    });

    const { category_ids, ...body } = req.body;

    // Atualiza o produto
    const [affectedCount, affectedRows] = await Product.update(body, {
      where: { id: req.params.id },
      returning: true,
      individualHooks: true,
    });
    const updatedProduct = await Product.findByPk(req.params.id);

    if (category_ids && category_ids.length > 0) {
      await updatedProduct.setCategories(category_ids);
    }

    return res.status(201).json({
      data: updatedProduct,
      message: "Produto atualizado com sucesso",
    });
  } catch (error) {
    if (error.name === "SequelizeUniqueConstraintError") {
      return res
        .status(400)
        .json({ message: "Já existe um produto com esse slug." });
    }

    console.error("Erro ao criar produto com imagem:", error);
    return res.status(500).json({
      message: "Erro interno ao criar produto com imagem.",
      details: error,
    });
  }
};

// Deletar produto
export const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findByPk(id);
    if (!product) {
      return res.status(404).json({ message: "Produto não encontrado." });
    }
    await product.destroy();
    res.status(202).send({ message: "Produto deletado com sucesso." });
  } catch (error) {
    res.status(500).json({ message: "Erro ao deletar produto." });
  }
};
