import Product from "../models/Product.js";
import ProductCategory from "../models/ProductCategory.js";
import Category from "../models/Category.js";

export const getAllProducts = async (req, res) => {
  try {
    // Product.belongsTo(ProductCategory, { foreignKey: "product_id" });

    const data = await Product.findAll();

    return res.json({ data: data });
  } catch (error) {
    res
      .status(400)
      .json({ message: error.message || "Erro ao buscar produtos." });
  }
};

// Buscar produto por ID
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

// Criar novo produto
// export const createProduct = async (req, res) => {
//   try {
//     const {
//       enabled,
//       name,
//       slug,
//       use_in_menu,
//       stock,
//       description,
//       price,
//       price_with_discount,
//       category_ids = [],
//       images = [],
//       option_values = [],
//     } = req.body;

//     // Validação de campos obrigatórios
//     if (
//       !name ||
//       !slug ||
//       !stock ||
//       !price ||
//       !price_with_discount ||
//       category_ids.length < 1
//     ) {
//       return res
//         .status(400)
//         .json({ message: "Campos obrigatórios não preenchidos." });
//     }

//     if (images.length === 0) {
//       return res
//         .status(400)
//         .json({ message: "Pelo menos uma imagem deve ser selecionada." });
//     }

//     if (option_values.length === 0) {
//       return res
//         .status(400)
//         .json({ message: "Pelo menos uma opção deve ser selecionada." });
//     }

//     // Validar existência de categorias
//     const invalids_ids = category_ids.filter(
//       (id) => !Number.isInteger(id) || id <= 0
//     );
//     if (invalids_ids.length > 0)
//       return res.status(400).json({ message: "IDs de categorias inválidos." });
//     const unique_ids = [...new Set(category_ids)];
//     const existingCategories = await Category.findAll({
//       where: { id: unique_ids },
//       attributes: ["id"],
//     });
//     const existing_ids = existingCategories.map((category) => category.id);
//     const missing_ids = unique_ids.filter((id) => !existing_ids.includes(id));
//     if (missing_ids.length > 0)
//       return res
//         .status(400)
//         .json({ message: "IDs de categorias não encontrados." });

//     // Cria o produto
//     const newProduct = await Product.create({
//       enabled,
//       name,
//       slug,
//       use_in_menu,
//       stock,
//       description,
//       price,
//       price_with_discount,
//     });

//     // Associa categorias
//     if (Array.isArray(category_ids) && category_ids.length > 0) {
//       await Promise.all(
//         category_ids.map((category_id) =>
//           ProductCategory.create({ product_id: newProduct.id, category_id })
//         )
//       );
//     }

//     // Cria imagens
//     let createdImages = [];
//     if (Array.isArray(images) && images.length > 0) {
//       createdImages = await Promise.all(
//         images.map((img) =>
//           ProductImage.create({
//             product_id: newProduct.id,
//             // type: img.type,
//             content: img.content,
//             path: img.path, // se o campo existir no model
//           })
//         )
//       );
//     }

//     // Cria opções
//     let createdOptions = [];
//     if (Array.isArray(option_values) && option_values.length > 0) {
//       createdOptions = await Promise.all(
//         option_values.map((opt) =>
//           ProductOption.create({
//             product_id: newProduct.id,
//             title: opt.title,
//             shape: opt.shape,
//             radius: opt.radius,
//             type: opt.type,
//             option_values: Array.isArray(opt.values)
//               ? opt.values.join(",")
//               : opt.values || "",
//           })
//         )
//       );
//     }

//     // Response espelhando o request
//     res
//       .status(201)
//       .json({ data: newProduct, message: "Produto criado com sucesso" });
//   } catch (error) {
//     if (error.name === "SequelizeUniqueConstraintError") {
//       return res
//         .status(400)
//         .json({ message: "Já existe um produto com esse slug." });
//     }
//     res
//       .status(500)
//       .json({ message: error.message || "Erro ao criar produto." });

//     res
//       .status(500)
//       .json({ error: error.parent.sqlMessage || "Erro ao criar produto." });
//   }
// };

// Atualizar produto
export const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      enabled,
      name,
      slug,
      use_in_menu,
      stock,
      description,
      price,
      price_with_discount,
    } = req.body;
    const product = await Product.findByPk(id);
    if (!product) {
      return res.status(404).json({ message: "Produto não encontrado." });
    }
    await product.update({
      enabled,
      name,
      slug,
      use_in_menu,
      stock,
      description,
      price,
      price_with_discount,
    });
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ message: "Erro ao atualizar produto." });
  }
};

// Criado pelo chatgpt
// export const updateProduct = async (req, res) => {
//   const transaction = await sequelize.transaction();

//   try {
//     const productId = parseInt(req.params.id, 10);
//     if (isNaN(productId) || productId <= 0) {
//       return res.status(400).json({ message: "ID de produto inválido." });
//     }

//     const existingProduct = await Product.findByPk(productId);
//     if (!existingProduct) {
//       return res.status(404).json({ message: "Produto não encontrado." });
//     }

//     const {
//       enabled = false,
//       name,
//       slug,
//       use_in_menu = false,
//       stock,
//       description,
//       price,
//       price_with_discount,
//       category_ids = [],
//       images = [],
//       option_values = [],
//     } = req.body;

//     // Validação mínima
//     if (!name || !slug || stock == null || !price || !price_with_discount) {
//       return res
//         .status(400)
//         .json({ message: "Campos obrigatórios não preenchidos." });
//     }

//     if (!Array.isArray(category_ids) || category_ids.length === 0) {
//       return res.status(400).json({ message: "Categorias são obrigatórias." });
//     }

//     if (!Array.isArray(images) || images.length === 0) {
//       return res
//         .status(400)
//         .json({ message: "Pelo menos uma imagem deve ser enviada." });
//     }

//     if (!Array.isArray(option_values) || option_values.length === 0) {
//       return res
//         .status(400)
//         .json({ message: "Pelo menos uma opção deve ser selecionada." });
//     }

//     // Verificação das categorias
//     const uniqueCategoryIds = [...new Set(category_ids)];
//     const invalidIds = uniqueCategoryIds.filter(
//       (id) => !Number.isInteger(id) || id <= 0
//     );
//     if (invalidIds.length > 0) {
//       return res.status(400).json({ message: "IDs de categorias inválidos." });
//     }

//     const foundCategories = await Category.findAll({
//       where: { id: uniqueCategoryIds },
//       attributes: ["id"],
//       transaction,
//     });

//     const foundIds = foundCategories.map((c) => c.id);
//     const missing = uniqueCategoryIds.filter((id) => !foundIds.includes(id));
//     if (missing.length > 0) {
//       return res
//         .status(400)
//         .json({ message: `Categorias não encontradas: ${missing.join(", ")}` });
//     }

//     // Atualiza o produto
//     await existingProduct.update(
//       {
//         enabled,
//         name,
//         slug,
//         use_in_menu,
//         stock,
//         description,
//         price,
//         price_with_discount,
//       },
//       { transaction }
//     );

//     // Limpa relações antigas
//     await ProductCategory.destroy({
//       where: { product_id: productId },
//       transaction,
//     });
//     await ProductImage.destroy({
//       where: { product_id: productId },
//       transaction,
//     });
//     await ProductOption.destroy({
//       where: { product_id: productId },
//       transaction,
//     });

//     // Recria relações
//     await ProductCategory.bulkCreate(
//       uniqueCategoryIds.map((category_id) => ({
//         product_id: productId,
//         category_id,
//       })),
//       { transaction }
//     );

//     const createdImages = await ProductImage.bulkCreate(
//       images.map((img) => ({
//         product_id: productId,
//         path: img.path,
//         content: img.content || null,
//         enabled: img.enabled ?? true,
//       })),
//       { transaction }
//     );

//     const createdOptions = await ProductOption.bulkCreate(
//       option_values.map((opt) => ({
//         product_id: productId,
//         title: opt.title,
//         shape: opt.shape,
//         radius: opt.radius,
//         type: opt.type,
//         option_values: JSON.stringify(opt.values || []),
//       })),
//       { transaction }
//     );

//     await transaction.commit();

//     return res.status(200).json({
//       message: "Produto atualizado com sucesso",
//       data: {
//         ...existingProduct.toJSON(),
//         categories: foundCategories,
//         images: createdImages,
//         options: createdOptions,
//       },
//     });
//   } catch (error) {
//     await transaction.rollback();

//     if (error.name === "SequelizeUniqueConstraintError") {
//       return res
//         .status(400)
//         .json({ message: "Slug já está em uso por outro produto." });
//     }

//     console.error("Erro ao atualizar produto:", error);
//     return res.status(500).json({
//       message: "Erro interno ao atualizar produto.",
//       details: error.message,
//     });
//   }
// };

// Deletar produto
export const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findByPk(id);
    if (!product) {
      return res.status(404).json({ message: "Produto não encontrado." });
    }
    await product.destroy();
    res.status(202).send("Produto deletado com sucesso.");
  } catch (error) {
    res.status(500).json({ message: "Erro ao deletar produto." });
  }
};
