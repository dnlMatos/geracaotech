const express = require("express");
const router = express.Router();
const userController = require("../controllers/user.controller");
const auth = require("../middleware/auth");

router.get("/", userController.getAll);
router.get("/user/:id", userController.getById);
router.post("/user/create", userController.create);
router.put("/user/update/:id", userController.update);
router.delete("/user/delete/:id", userController.delete);
router.post("/user/login", userController.login);

module.exports = router;
