require("dotenv").config();
const app = require("./app");
const { sequelize } = require("./models");

const PORT = process.env.PORT || 3000;
const SYNC_FORCE = process.env.SYNC_FORCE === "false";

(async () => {
  try {
    await sequelize.sync({ force: SYNC_FORCE });
    if (SYNC_FORCE) {
      console.log("Tabelas recriadas com force: true");
    }
    app.listen(PORT, () => {
      console.log(`Servidor rodando na porta ${PORT}`);
    });
  } catch (err) {
    console.error("Erro ao conectar ao banco de dados:", err);
  }
})();
