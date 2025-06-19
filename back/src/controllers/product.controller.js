const productDB = require("../services/productDB");
const { ProductOption } = require("../models");
const categoryDB = require("../services/categoryDB");

class ProductController {
  async listAll(req, res) {
    try {
      const products = await productDB.FindAll();
      res.status(200).json({ product: products });
    } catch (error) {
      res.status(500).json({ error: error || "Erro ao buscar produtos" });
    }
  }

  async getById(req, res) {
    try {
      const { id } = req.params;
      const product = await productDB.FindById(id);
      if (!product) {
        return res.status(404).json({ error: "Produto não encontrado" });
      }
      res.status(200).json(product);
    } catch (error) {
      res.status(500).json({ error: error || "Erro ao buscar produto" });
    }
  }

  async create(req, res) {
    try {
      const { option_values, images, category_ids, ...data } = req.body;

      const checkedCategoryIds = await categoryDB.FindById(category_ids);
      if (category_ids.length !== checkedCategoryIds.length) {
        res.json({ message: "Uma ou mais categorias não encontradas" });
      }

      const product = await productDB.Create(data);

      // Popula a tabela pivô usando a função auxiliar do Sequelize
      if (
        category_ids.length === 0 ||
        (category_ids && Array.isArray(category_ids))
      ) {
        await product.setProduct_categories(category_ids);
      }

      // Se houver imagens, associa as imagens ao produto
      // const a = await product.setProduct_images(images);
      // console.log(a);

      // Cria as opções do produto
      if (option_values && Array.isArray(option_values)) {
        await Promise.all(
          option_values.map(async (opt) => {
            try {
              await ProductOption.create({
                product_id: product.id,
                title: opt.title,
                shape: opt.shape,
                radius: opt.radius,
                type: opt.type,
                option_values: Array.isArray(opt.values)
                  ? opt.values.join(",")
                  : opt.values || "",
              });
            } catch (err) {
              console.error("Erro ao criar ProductOption:", err);
            }
          })
        );
      }

      res.status(201).json(product);
    } catch (error) {
      res.status(500).json({ error: error || "Erro ao criar produto" });
    }
  }

  async update(req, res) {
    try {
      const { id } = req.params;
      const { option_values, images, category_ids, ...data } = req.body;

      // Busca o produto pelo ID
      const product = await productDB.FindById(id);
      if (!product) {
        return res.status(404).json({ error: "Produto não encontrado" });
      }

      const checkedCategoryIds = await categoryDB.FindById(category_ids);
      if (
        category_ids.length === 0 ||
        category_ids.length !== checkedCategoryIds.length
      ) {
        res.json({ message: "Uma ou mais categorias não encontradas" });
      }

      // Atualiza os dados do produto
      let productUpdated = await product.update(data);

      // Atualiza as categorias associadas na tabela pivô
      if (category_ids && Array.isArray(category_ids)) {
        await productUpdated.setProduct_categories(category_ids);
      }

      // Exclui todas as opções antigas do produto
      await ProductOption.destroy({ where: { product_id: product.id } });

      // Cria as novas opções do produto
      if (option_values && Array.isArray(option_values)) {
        await Promise.all(
          option_values.map((opt) =>
            ProductOption.create({
              product_id: product.id,
              title: opt.title,
              shape: opt.shape,
              radius: opt.radius,
              type: opt.type,
              option_values: Array.isArray(opt.values)
                ? opt.values.join(",")
                : opt.values || "",
            })
          )
        );
      }

      // Atualiza os dados do produto
      productUpdated = await productDB.FindById(id);

      res.status(200).json(productUpdated);
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
