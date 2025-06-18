const CategoryModel = require("../models/category");
const ProductModel = require("../models/product");

class ProductDatabase {
  async FindAll() {
    return await ProductModel.findAll({
      // include: {
      //   model: CategoryModel,
      //   as: "categories",
      // },
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
