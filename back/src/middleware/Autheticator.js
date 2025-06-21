const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

dotenv.config();

class Authenticator {
  generateToken = (payload) => {
    console.log("Generating token with payload:", payload);

    const token = jwt.sign(payload, process.env.JWT_KEY, { expiresIn: "10h" });

    return token;
  };

  getTokenData = (token) => {
    console.log("Verifying token:", token);
    try {
      const payload = jwt.verify(token, process.env.JWT_KEY);

      return payload;
    } catch (error) {
      return false;
    }
  };
}

module.exports = Authenticator;
