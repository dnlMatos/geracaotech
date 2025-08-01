const categoryModel = require("../models/category");

class CategoryDatabase {
  async FindAll() {
    return await categoryModel.findAll();
  }

  async FindById(ids) {
    if (Array.isArray(ids) && ids.length > 0) {
      return await categoryModel.findAll({
        where: {
          id: ids,
        },
      });
    }
    return await categoryModel.findOne({ where: { id: ids } });
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
