const express = require("express");
const categoryController = require("../controllers/category.controller");
const checkUser = require("../middleware/checkUser");

const router = express.Router();

router.get("/", categoryController.listAll);
router.get("/category/:id", categoryController.getById);
router.post("/category/create", checkUser, categoryController.create);
router.put("/category/update/:id", checkUser, categoryController.update);
router.delete("/category/delete/:id", checkUser, categoryController.delete);

module.exports = router;
