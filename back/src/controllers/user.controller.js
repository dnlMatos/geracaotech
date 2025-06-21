const HashManager = require("../middleware/HashManager");
const Authenticator = require("../middleware/Autheticator");

const userDB = require("../services/userDB");

module.exports = {
  async getAll(req, res) {
    try {
      const users = await userDB.getAllUsers();

      if (users.length === 0) {
        throw new Error("Nenhum usuário encontrado.");
      }

      res.status(200).json(users);
    } catch (err) {
      res.status(500).json({ error: "Erro ao buscar usuários" });
    }
  },

  async getById(req, res) {
    try {
      const user = await userDB.findOne(req.params.id);

      if (!user)
        return res.status(404).json({ error: "Usuário não encontrado" });

      res.status(200).json(user);
    } catch (error) {
      res
        .status(500)
        .json({ error: error.message || "Erro ao buscar usuário" });
    }
  },

  async create(req, res) {
    try {
      const { firstname, surname, email, password } = req.body;
      if (!firstname || !surname || !email || !password) {
        return res
          .status(400)
          .json({ error: "Dados necessários não informados" });
      }

      if (password.length < 6)
        throw new Error("A senha deve ter pelo menos 6 caracteres");

      const exists = await userDB.findUserByEmail(email);

      if (exists) return res.status(400).json({ error: "Email já cadastrado" });

      // Criptografa a senha usando HashManager
      const hashManager = new HashManager();
      const hashPassword = await hashManager.hash(password);

      const newUser = await userDB.createUser({
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

      res.status(201).json({ user: userResponse, token });
    } catch (error) {
      res
        .status(400)
        .json({ error: error.message || "Erro ao cadastrar usuário" });
    }
  },

  async login(req, res) {
    try {
      const { email, password } = req.body;
      if (!email || !password) {
        return res
          .status(400)
          .json({ error: "Dados necessários não informados" });
      }

      const user = await userDB.loginUser(email);
      if (!user) {
        return res.status(400).json({ error: "Usuário não encontrado" });
      }

      // Verifica a senha usando HashManager
      const hashManager = new HashManager();
      const isValidPassword = await hashManager.compare(
        password,
        user.password
      );

      if (!isValidPassword) {
        return res.status(400).json({ error: "Usuário ou senha inválidos" });
      }

      // Gera o token de autenticação
      const authenticator = new Authenticator();
      const token = authenticator.generateToken({ id: user.id });

      // Remove o campo password do objeto retornado
      const userResponse = { ...user.get(), password: undefined };

      res.status(200).json({ ...userResponse, token });
    } catch (error) {
      res.status(500).json({ error: error.message || "Erro ao fazer login" });
    }
  },

  async update(req, res) {
    try {
      const { id } = req.params;
      const { firstname, surname, email, password } = req.body;

      const user = await userDB.findOne(id);

      if (!user)
        return res.status(404).json({ error: "Usuário não encontrado." });

      if (!firstname || !surname || !email) {
        return res
          .status(400)
          .json({ error: "Dados necessários não informados" });
      }

      // Verifica se o email já está em uso por outro usuário
      if (email && email !== user.email) {
        const existingUser = await userDB.findOne({ where: { email } });
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
        surname:
          surname !== undefined && surname !== "" ? surname : user.surname,
        email: email !== undefined && email !== "" ? email : user.email,
      };

      if (password && password.trim() !== "") {
        if (password.length < 6) {
          return res
            .status(400)
            .json({ error: "A senha deve ter pelo menos 6 caracteres" });
        }
        const hashManager = new HashManager();
        updateData.password = await hashManager.hash(password);
      }

      await userDB.updateUser({ id: user.id, updateData });

      const newUser = await userDB.findOne(user.id);

      res.status(200).json(newUser);
    } catch (err) {
      res.status(500).json({ error: "Erro ao atualizar usuário" });
    }
  },

  async delete(req, res) {
    try {
      const { id } = req.params;

      if (!id) {
        return res.status(400).json({ error: "Usuário não informado." });
      }
      const userExists = await userDB.findOne(id);

      if (!userExists) {
        return res.status(404).json({ error: "Usuário não encontrado." });
      }

      await userDB.deleteUser(id);

      res.status(204).send({ message: "Usuário deletado com sucesso" });
    } catch (err) {
      res.status(500).json({ error: "Erro ao deletar usuário" });
    }
  },
};
