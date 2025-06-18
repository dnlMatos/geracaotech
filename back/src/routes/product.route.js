const express = require("express");
const router = express.Router();
const productController = require("../controllers/product.controller");
const auth = require("../middleware/auth");

// router.get("/product/:search", productController.search);
router.get("/", productController.listAll);
// router.get("/product/:id", productController.getById);
router.post("/product/create", productController.create);
router.put("/product/update/:id", productController.update);
router.delete("/product/delete/:id", productController.delete);

module.exports = router;
