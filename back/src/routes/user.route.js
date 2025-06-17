const express = require("express");
const router = express.Router();
const userController = require("../controllers/user.controller");
const auth = require("../middleware/auth");

router.get("/:id", userController.getById);
router.post("/", auth, userController.create);
router.put("/:id", auth, userController.update);
router.delete("/:id", auth, userController.delete);
router.post("/token", userController.token);

module.exports = router;
