import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

export class Authenticator {
  generateToken = (payload) => {
    const token = jwt.sign(payload, process.env.JWT_KEY, { expiresIn: "10h" });

    return token;
  };

  getTokenData = (token) => {
    try {
      const payload = jwt.verify(token, process.env.JWT_KEY);

      return payload;
    } catch (error) {
      return false;
    }
  };
}
