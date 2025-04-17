const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const auth = require("../middleware/auth");

router.post("/register", userController.createUser);
router.post("/login", userController.loginUser);
router.get("/profile", auth, userController.getUser);

module.exports = router;
