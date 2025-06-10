import User from "../models/User.js";
import { Authenticator } from "../services/Authenticator.js";
import { HashManager } from "../services/HashManager.js";

// Listar todos os usuários
export const getAllUsers = async (req, res) => {
  try {
    const users = await User.findAll();

    if (users.length === 0) {
      return res.status(404).json({ error: "Nenhum usuário encontrado." });
    }

    // Remove o campo password de cada usuário
    const usersResponse = users.map((user) => {
      const userObj = user.get();
      delete userObj.password;
      return userObj;
    });

    res.status(200).json({ users: usersResponse });
  } catch (error) {
    res
      .status(500)
      .json({ error: error.message || "Erro ao buscar usuários." });
  }
};

// Buscar usuário por ID
export const getUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findByPk(id);
    if (!user) {
      return res.status(404).json({ error: "Usuário não encontrado." });
    }
    // Remove o campo password do usuário
    const userResponse = user.get();
    delete userResponse.password;

    res.status(200).json(userResponse);
  } catch (error) {
    res.status(500).json({ error: "Erro ao buscar usuário." });
  }
};

// Criar novo usuário
export const createUser = async (req, res) => {
  try {
    const { firstname, surname, email, password } = req.body;

    if (!firstname || !surname || !email || !password) {
      return res.status(400).json("Todos os campos são obrigatórios");
    }

    if (password.length < 6) {
      return res.status(400).json("A senha deve ter pelo menos 6 caracteres");
    }

    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json("Usuário já cadastrado");
    }

    // Criptografa a senha usando HashManager
    const hashManager = new HashManager();
    const hashPassword = await hashManager.hash(password);

    const newUser = await User.create({
      firstname,
      surname,
      email,
      password: hashPassword,
    });

    // Remove o campo password do objeto retornado
    const userResponse = { ...newUser.get(), password: undefined };

    // Gera o token de autenticação
    const authenticator = new Authenticator();
    const token = authenticator.generateToken({ id: newUser.id });

    // Retorna o usuário e o token de autenticação
    return res.status(201).json({
      user: userResponse,
      token,
      message: "Usuário criado com sucesso.",
    });
  } catch (error) {
    return res
      .status(500)
      .json({ error: error.message || "Erro ao criar usuário." });
  }
};

// Login de usuário
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json("Todos os campos são obrigatórios");
    }

    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(404).json({ error: "Usuário não encontrado." });
    }

    const hashManager = new HashManager();
    const isPasswordCorrect = await hashManager.compare(
      password,
      user.password
    );

    if (!isPasswordCorrect) {
      return res.status(401).json({ error: "Senha inválida." });
    }

    const authenticator = new Authenticator();
    const token = authenticator.generateToken({ id: user.id });

    return res.status(200).json({ token });
  } catch (error) {
    return res
      .status(401)
      .json({ error: error.message || "Erro ao fazer login." });
  }
};

// Atualizar usuário
export const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    let { firstname, surname, email, password } = req.body;
    const user = await User.findByPk(id);

    if (!user)
      return res.status(404).json({ error: "Usuário não encontrado." });

    // Verifica se o email já está em uso por outro usuário
    if (email && email !== user.email) {
      const existingUser = await User.findOne({ where: { email } });
      if (existingUser && existingUser.id !== user.id) {
        return res.status(400).json({ error: "Email já cadastrado" });
      }
    }

    // Monta objeto de atualização
    const updateData = {
      firstname:
        firstname !== undefined && firstname !== ""
          ? firstname
          : user.firstname,
      surname: surname !== undefined && surname !== "" ? surname : user.surname,
      email: email !== undefined && email !== "" ? email : user.email,
    };

    if (password && password.trim() !== "") {
      if (password.length < 6) {
        return res.status(400).json({
          error: "A senha deve ter pelo menos 6 caracteres",
        });
      }
      const hashManager = new HashManager();
      updateData.password = await hashManager.hash(password);
    }

    await user.update(updateData);
    return res.status(200).json({
      ...user.get(),
      password: undefined,
      message: "Usuário atualizado com sucesso.",
    });
  } catch (error) {
    return res
      .status(500)
      .json({ error: error.message || "Erro ao atualizar usuário." });
  }
};

// Deletar usuário
export const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findByPk(id);
    if (!user) {
      return res.status(404).json({ error: "Usuário não encontrado." });
    }
    await user.destroy();
    return res.status(204).send("Usuário deletado com sucesso.");
  } catch (error) {
    res
      .status(500)
      .json({ error: error.message || "Erro ao deletar usuário." });
  }
};
