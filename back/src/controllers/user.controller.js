const { User } = require("../models");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

module.exports = {
  async getById(req, res) {
    try {
      const user = await User.findByPk(req.params.id, {
        attributes: ["id", "firstname", "surname", "email"],
      });
      if (!user)
        return res.status(404).json({ error: "Usuário não encontrado" });
      res.status(200).json(user);
    } catch (err) {
      res.status(500).json({ error: "Erro ao buscar usuário" });
    }
  },

  async create(req, res) {
    const { firstname, surname, email, password, confirmPassword } = req.body;
    if (
      !firstname ||
      !surname ||
      !email ||
      !password ||
      password !== confirmPassword
    ) {
      return res.status(400).json({ error: "Dados inválidos" });
    }
    try {
      const exists = await User.findOne({ where: { email } });
      if (exists) return res.status(400).json({ error: "Email já cadastrado" });
      const user = await User.create({ firstname, surname, email, password });
      res.status(201).json({ id: user.id, firstname, surname, email });
    } catch (err) {
      res.status(400).json({ error: "Erro ao cadastrar usuário" });
    }
  },

  async update(req, res) {
    const { firstname, surname, email } = req.body;
    if (!firstname || !surname || !email) {
      return res.status(400).json({ error: "Dados inválidos" });
    }
    try {
      const [updated] = await User.update(
        { firstname, surname, email },
        { where: { id: req.params.id } }
      );
      if (!updated)
        return res.status(404).json({ error: "Usuário não encontrado" });
      res.status(204).send();
    } catch (err) {
      res.status(500).json({ error: "Erro ao atualizar usuário" });
    }
  },

  async delete(req, res) {
    try {
      const deleted = await User.destroy({ where: { id: req.params.id } });
      if (!deleted)
        return res.status(404).json({ error: "Usuário não encontrado" });
      res.status(204).send();
    } catch (err) {
      res.status(500).json({ error: "Erro ao deletar usuário" });
    }
  },

  async token(req, res) {
    const { email, password } = req.body;
    if (!email || !password)
      return res.status(400).json({ error: "Dados inválidos" });
    try {
      const user = await User.scope(null).findOne({ where: { email } });
      if (!user)
        return res.status(400).json({ error: "Usuário ou senha inválidos" });
      const valid = await bcrypt.compare(password, user.password);
      if (!valid)
        return res.status(400).json({ error: "Usuário ou senha inválidos" });
      const token = jwt.sign(
        { id: user.id, email: user.email },
        process.env.JWT_SECRET,
        { expiresIn: "1d" }
      );
      res.status(200).json({ token });
    } catch (err) {
      res.status(500).json({ error: "Erro ao gerar token" });
    }
  },
};
