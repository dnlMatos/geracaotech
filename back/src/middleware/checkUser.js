const Authenticator = require("../middleware/Autheticator");

async function CheckUser(req, res, next) {
  try {
    const { authorization } = req.headers;

    if (!authorization) {
      throw new Error("Usuário não autorizado");
    }

    const token = authorization.split(" ")[1];
    console.log("Token recebido:", token);

    const auth = new Authenticator();
    const verifyToken = auth.getTokenData(token);

    if (!verifyToken) {
      throw new Error("Usuário não autorizado");
    }

    next();
  } catch (error) {
    res.status(401).send(error.message);
  }
}

module.exports = CheckUser;
