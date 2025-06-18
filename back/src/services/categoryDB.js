const categoryModel = require("../models/category");

class CategoryDatabase {
  async FindAll(ids) {
    if (ids && ids.length > 0) {
      return await categoryModel.findAll({
        where: {
          id: ids,
        },
      });
    } else {
      return await categoryModel.findAll();
    }
  }

  async FindById(id) {
    return await categoryModel.findOne({ where: { id } });
  }

  async Create(data) {
    return await categoryModel.create(data);
  }

  async Update(id, data) {
    const category = await categoryModel.findOne({ where: { id } });

    await category.update(data);
    return category;
  }

  async Delete(id) {
    const category = await this.FindById(id);
    if (category) {
      await category.destroy();
      return true;
    }
    return false;
  }
}

module.exports = new CategoryDatabase();
