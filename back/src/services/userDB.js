const User = require("../models/user");

class UserDatabase {
  async getAllUsers() {
    try {
      return await User.findAll({
        attributes: ["id", "firstname", "surname", "email"],
      });
    } catch (error) {
      throw new Error({ error: error.message || "Erro ao buscar usuários" });
    }
  }

  async loginUser(email) {
    try {
      return await User.findOne({ where: { email } });
    } catch (error) {
      throw new Error({ error: error.message || "Erro ao buscar usuários" });
    }
  }

  async findOne(id) {
    try {
      const user = await User.findOne({
        where: { id },
        attributes: ["id", "firstname", "surname", "email"],
      });
      return user;
    } catch (error) {
      throw new Error({ error: error.message || "Erro ao buscar usuário" });
    }
  }

  async findUserByEmail(email) {
    try {
      const user = await User.findOne({
        where: { email },
        attributes: ["id", "firstname", "surname", "email"],
      });

      return user;
    } catch (error) {
      throw new Error({ error: error.message || "Erro ao buscar usuário" });
    }
  }

  async createUser(data) {
    try {
      const user = await User.create(data);
      return user;
    } catch (error) {
      throw new Error({ error: error.message || "Erro ao criar usuário" });
    }
  }

  async updateUser({ id, updateData }) {
    try {
      const user = await User.findByPk(id);
      await User.update(updateData, { where: { id } });
      return user;
    } catch (error) {
      throw new Error({ error: error.message || "Erro ao atualizar usuário" });
    }
  }

  async deleteUser(id) {
    try {
      await User.destroy({ where: { id } });
      return;
    } catch (error) {
      throw new Error({ error: error.message || "Erro ao deletar usuário" });
    }
  }
}

module.exports = new UserDatabase();
