const { Product, Category, ProductImage, ProductOption } = require("../models");
const { Op } = require("sequelize");

function parsePriceRange(range) {
  if (!range) return {};
  const [min, max] = range.split("-").map(Number);
  return {
    [Op.gte]: min,
    [Op.lte]: max,
  };
}

module.exports = {
  async listAll(req, res) {
    let {
      limit = 12,
      page = 1,
      fields,
      match,
      category_ids,
      price_range,
    } = req.query;
    limit = parseInt(limit);
    page = parseInt(page);

    const where = {};

    if (match) {
      where[Op.or] = [
        { name: { [Op.like]: `%${match}%` } },
        { description: { [Op.like]: `%${match}%` } },
      ];
    }

    if (price_range) {
      where.price = parsePriceRange(price_range);
    }

    let include = [
      {
        model: Category,
        as: "categories",
        through: { attributes: [] },
      },
      { model: ProductImage, as: "images", attributes: ["id", "path"] },
      { model: ProductOption, as: "options" },
    ];

    if (category_ids) {
      include[0].where = { id: category_ids.split(",").map(Number) };
    }

    let attributes = fields ? fields.split(",") : undefined;
    let options = { where, include };

    if (attributes) options.attributes = attributes;

    if (limit !== -1) {
      options.limit = limit;
      options.offset = (page - 1) * limit;
    }

    try {
      const { rows, count } = await Product.findAndCountAll(options);
      const data = rows.map((product) => {
        const prod = product.toJSON();
        // Remover category_ids do objeto de resposta
        delete prod.category_ids;
        return {
          ...prod,
          images: product.images.map((img) => ({
            id: img.id,
            content: img.path,
          })),
        };
      });
      res.status(200).json({ data, total: count, limit, page });
    } catch (err) {
      res.status(500).json({ error: "Erro ao buscar produtos" });
    }
  },

  async getById(req, res) {
    try {
      const product = await Product.findByPk(req.params.id, {
        include: [
          {
            model: Category,
            as: "categories",
            through: { attributes: [] },
          },
          { model: ProductImage, as: "images" },
          { model: ProductOption, as: "options" },
        ],
      });
      if (!product)
        return res.status(404).json({ error: "Produto não encontrado" });
      const prod = product.toJSON();
      delete prod.category_ids;
      res.status(200).json({ product: prod });
    } catch (err) {
      res.status(500).json({ error: "Erro ao buscar produto" });
    }
  },

  async create(req, res) {
    const {
      enabled,
      name,
      slug,
      stock,
      description,
      price,
      price_with_discount,
      category_ids,
      images,
      options,
      use_in_menu,
    } = req.body;
    if (
      !name ||
      !slug ||
      price === undefined ||
      price_with_discount === undefined
    ) {
      return res.status(400).json({ error: "Dados inválidos" });
    }
    try {
      // Validação de categorias
      if (category_ids && Array.isArray(category_ids)) {
        const foundCategories = await Category.findAll({
          where: { id: category_ids },
        });
        if (foundCategories.length !== category_ids.length) {
          return res
            .status(400)
            .json({ error: "Uma ou mais categorias não existem" });
        }
      }
      if (
        category_ids &&
        Array.isArray(category_ids) &&
        category_ids.length === 0
      ) {
        return res.status(400).json({ error: "Categoria não informada" });
      }

      // Validação de imagens
      if (images && Array.isArray(images) && images.length < 1) {
        return res.status(400).json({ error: "Imagem não enviada" });
      }
      const product = await Product.create({
        enabled,
        name,
        slug,
        stock,
        description,
        price,
        price_with_discount,
        use_in_menu,
      });

      // Associar categorias ao produto
      if (category_ids && Array.isArray(category_ids)) {
        await product.setCategories(category_ids);
      }

      // Validação de imagens
      if (options && Array.isArray(options) && options.length < 1) {
        return res.status(400).json({ error: "Opções não informadas" });
      }

      // Criar associações de imagens e opções
      if (images && Array.isArray(images)) {
        for (const img of images) {
          await ProductImage.create({
            product_id: product.id,
            path: img.content,
            enabled: true,
          });
        }
      }

      // Criar associações de opções
      if (options && Array.isArray(options)) {
        for (const opt of options) {
          await ProductOption.create({
            product_id: product.id,
            title: opt.title,
            shape: opt.shape || "square",
            radius: opt.radius || 0,
            type: opt.type || "text",
            values: Array.isArray(opt.values) ? opt.values.join(",") : "",
          });
        }
      }

      // Após criar produto, buscar produto completo com todas as associações
      const productWithAssociations = await Product.findByPk(product.id, {
        include: [
          {
            model: Category,
            as: "categories",
            through: { attributes: [] },
          },
          { model: ProductImage, as: "images" },
          { model: ProductOption, as: "options" },
        ],
      });
      res.status(201).json({ product: productWithAssociations });
    } catch (err) {
      res
        .status(400)
        .json({ error: err.message || "Erro ao cadastrar produto" });
    }
  },

  async update(req, res) {
    const {
      enabled,
      name,
      slug,
      stock,
      description,
      price,
      price_with_discount,
      category_ids,
      images,
      options,
      use_in_menu,
    } = req.body;
    if (
      !name ||
      !slug ||
      price === undefined ||
      price_with_discount === undefined
    ) {
      return res.status(400).json({ error: "Dados inválidos" });
    }
    try {
      // Validação de categorias
      if (category_ids && Array.isArray(category_ids)) {
        const foundCategories = await Category.findAll({
          where: { id: category_ids },
        });
        if (foundCategories.length !== category_ids.length) {
          return res
            .status(400)
            .json({ error: "Uma ou mais categorias não existem" });
        }
      }
      if (
        category_ids &&
        Array.isArray(category_ids) &&
        category_ids.length === 0
      ) {
        return res.status(400).json({ error: "Categoria não informada" });
      }

      // Validação de imagens
      if (images && Array.isArray(images) && images.length < 1) {
        return res.status(400).json({ error: "Imagem não enviada" });
      }

      const [updated] = await Product.update(
        {
          enabled,
          name,
          slug,
          stock,
          description,
          price,
          price_with_discount,
          use_in_menu,
        },
        { where: { id: req.params.id } }
      );
      // Se o produto não foi encontrado, retorna erro 404
      if (!updated)
        return res.status(404).json({ error: "Produto não encontrado" });

      // Atualizar categorias associadas
      const product = await Product.findByPk(req.params.id, {
        include: [
          {
            model: Category,
            as: "categories",
            through: { attributes: [] },
          },
          { model: ProductImage, as: "images" },
          { model: ProductOption, as: "options" },
        ],
      });

      res.status(200).json({ product });
    } catch (err) {
      res
        .status(400)
        .json({ error: err.message || "Erro ao atualizar produto" });
    }
  },

  async delete(req, res) {
    try {
      const product = await Product.findByPk(req.params.id, {
        include: [
          {
            model: Category,
            as: "categories",
            through: { attributes: [] },
          },
          { model: ProductImage, as: "images" },
          { model: ProductOption, as: "options" },
        ],
      });
      if (!product)
        return res.status(404).json({ error: "Produto não encontrado" });
      await Product.destroy({ where: { id: req.params.id } });
      res.status(200).json({ product });
    } catch (err) {
      res.status(500).json({ error: "Erro ao deletar produto" });
    }
  },
};
