const express = require("express");
const router = express.Router();
const userController = require("../controllers/user.controller");
const checkUser = require("../middleware/checkUser");

router.get("/", userController.getAll);
router.get("/user/:id", checkUser, userController.getById);
router.post("/user/create", userController.create);
router.put("/user/update/:id", checkUser, userController.update);
router.delete("/user/delete/:id", checkUser, userController.delete);
router.post("/user/login", userController.login);

module.exports = router;
