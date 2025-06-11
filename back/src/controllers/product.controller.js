import Product from "../models/Product.js";
import { Op } from "sequelize";
import ProductCategory from "../models/ProductCategory.js";
import ProductImage from "../models/ProductImage.js";
import ProductOption from "../models/ProductOption.js";
import {
  utilities,
  parseFields,
  parseCategoryIds,
  parsePriceRange,
  parseOptionFilters,
  buildMatchWhere,
} from "../utils/utilities.js";
import Category from "../models/Category.js";

export const getAllProducts = async (req, res) => {
  try {
    const { limit, page, offset } = utilities(req.query);
    const {
      fields,
      match,
      category_ids,
      "price-range": priceRange,
      ...optionFilters
    } = req.query;

    const attributes = parseFields(fields);
    const where = {};
    Object.assign(where, buildMatchWhere(match, ["name", "description"]));
    Object.assign(where, parsePriceRange(priceRange));
    const categoryFilter = parseCategoryIds(category_ids);
    const optionWhere = parseOptionFilters(optionFilters);

    const include = [
      {
        model: ProductImage,
        as: "images",
        attributes: ["id", "content"],
      },
      {
        model: ProductOption,
        as: "options",
        ...(optionWhere.length > 0 ? { where: { [Op.and]: optionWhere } } : {}),
      },
      {
        model: ProductCategory,
        as: "categories",
        attributes: ["category_id"],
        ...(categoryFilter
          ? { where: { category_id: { [Op.in]: categoryFilter } } }
          : {}),
      },
    ];

    const { rows, count } = await Product.findAndCountAll({
      where,
      attributes,
      include,
      limit: limit || undefined,
      offset: offset || undefined,
      distinct: true,
    });

    const data = rows.map((product) => {
      const prod = product.toJSON();
      prod.category_ids = prod.categories?.map((c) => c.category_id) || [];
      delete prod.categories;
      return prod;
    });

    res.status(200).json({
      data,
      total: count,
      limit: limit === null ? -1 : limit,
      page,
    });
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
    const product = await Product.findByPk(id);
    if (!product) {
      return res.status(404).json({ message: "Produto não encontrado." });
    }
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ message: "Erro ao buscar produto." });
  }
};

// Criar novo produto
export const createProduct = async (req, res) => {
  try {
    const {
      enabled,
      name,
      slug,
      use_in_menu,
      stock,
      description,
      price,
      price_with_discount,
      category_ids = [],
      images = [],
      option_values = [],
    } = req.body;

    // Validação de campos obrigatórios
    if (!name || !slug || !stock || !price || !price_with_discount) {
      return res
        .status(400)
        .json({ message: "Campos obrigatórios não preenchidos." });
    }

    if (category_ids.length === 0 || typeof category_ids === "") {
      return res.status(400).json({ message: "Categoria inválida" });
    }

    if (images.length === 0) {
      return res
        .status(400)
        .json({ message: "Pelo menos uma imagem deve ser selecionada." });
    }

    if (option_values.length === 0) {
      return res
        .status(400)
        .json({ message: "Pelo menos uma opção deve ser selecionada." });
    }

    // Cria o produto
    const newProduct = await Product.create({
      enabled,
      name,
      slug,
      use_in_menu,
      stock,
      description,
      price,
      price_with_discount,
    });

    // Validar existência de categorias
    const categoryIdsClean = (
      Array.isArray(category_ids) ? category_ids : [category_ids]
    )
      .map((id) => parseInt(id, 10))
      .filter((id) => !isNaN(id));

    if (categoryIdsClean.length === 0) {
      return res.status(400).json({ message: "IDs de categoria inválidos." });
    }

    await Category.findAll({
      where: { id: { [Op.in]: categoryIdsClean } },
    });

    // Associa categorias
    if (Array.isArray(category_ids) && category_ids.length > 0) {
      await Promise.all(
        category_ids.map((category_id) =>
          ProductCategory.create({ product_id: newProduct.id, category_id })
        )
      );
    }

    // Cria imagens
    let createdImages = [];
    if (Array.isArray(images) && images.length > 0) {
      createdImages = await Promise.all(
        images.map((img) =>
          ProductImage.create({
            product_id: newProduct.id,
            type: img.type,
            content: img.content,
            path: img.path, // se o campo existir no model
          })
        )
      );
    }

    // Cria opções
    let createdOptions = [];
    if (Array.isArray(option_values) && option_values.length > 0) {
      createdOptions = await Promise.all(
        option_values.map((opt) =>
          ProductOption.create({
            product_id: newProduct.id,
            title: opt.title,
            shape: opt.shape,
            radius: opt.radius,
            type: opt.type,
            values: Array.isArray(opt.values)
              ? opt.values.join(",")
              : opt.values || "",
          })
        )
      );
    }

    // Response espelhando o request
    res.status(201).json({
      enabled: newProduct.enabled,
      name: newProduct.name,
      slug: newProduct.slug,
      stock: newProduct.stock,
      description: newProduct.description,
      price: newProduct.price,
      price_with_discount: newProduct.price_with_discount,
      category_ids: Array.isArray(category_ids) ? category_ids : [],
      images: createdImages.map((img) => ({
        type: img.type,
        content: img.content,
      })),
      option_values: createdOptions.map((opt) => ({
        title: opt.title,
        shape: opt.shape,
        radius: opt.radius,
        type: opt.type,
        values: typeof opt.values === "string" ? opt.values.split(",") : [],
      })),
    });
  } catch (error) {
    if (error.name === "SequelizeUniqueConstraintError") {
      return res
        .status(400)
        .json({ message: "Já existe um produto com esse slug." });
    }
    res
      .status(500)
      .json({ message: error.message || "Erro ao criar produto." });

    res
      .status(500)
      .json({ error: error.parent.sqlMessage || "Erro ao criar produto." });
  }
};

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
