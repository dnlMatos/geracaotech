const { CategoryModel } = require("../models/category");
const productModel = require("../models/product");
const productCategory = require("../models/productCategory");

class ProductDatabase {
  async FindAll() {
    return await productModel.findAll({
      include: [
        {
          model: productCategory,
          as: "product_categories",
        },
      ],
    });
  }
}

module.exports = new ProductDatabase();
