import bcrypt from "bcryptjs";

export class HashManager {
  async hash(text) {
    const rounds = 10;
    const salt = await bcrypt.genSalt(rounds);
    const result = await bcrypt.hash(text, salt);
    return result;
  }

  async compare(text, hash) {
    return await bcrypt.compare(text, hash);
  }
}
