const express = require("express");
const router = express.Router();
const categoryController = require("../controllers/category.controller");
const auth = require("../middleware/auth");

router.get("/", categoryController.listAll);
router.get("/search", categoryController.search);
router.get("/category/:id", categoryController.getById);
router.post("/category/create", categoryController.create);
router.put("/category/update/:id", categoryController.update);
router.delete("/category/delete/:id", categoryController.delete);

module.exports = router;
