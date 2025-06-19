const { ProductOption } = require("../models");
const CategoryModel = require("../models/category");
const ProductModel = require("../models/product");

class ProductDatabase {
  async FindAll() {
    return await ProductModel.findAll({
      include: [
        {
          model: CategoryModel,
          as: "product_categories",
          through: {
            attributes: [], // não traz os dados da tabela pivô, só faz o join
          },
        },
        {
          model: ProductOption,
          as: "product_options",
        },
      ],
    });
  }

  async FindById(id) {
    return await ProductModel.findOne({
      where: { id },
      include: [
        {
          model: CategoryModel,
          as: "product_categories",
          through: {
            attributes: [], // não traz os dados da tabela pivô, só faz o join
          },
        },
        {
          model: ProductOption,
          as: "product_options",
        },
      ],
    });
  }

  async Create(product) {
    return await ProductModel.create(product);
  }

  async Delete(id) {
    return await ProductModel.destroy({
      where: {
        id: id,
      },
    });
  }
}

module.exports = new ProductDatabase();
