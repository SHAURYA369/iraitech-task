const express = require("express");
const router = express.Router();
const authController = require("../controllers/auth_controller");

// @route POST /auth/login
// @desc Register user
// @access Public
router.post("/register", authController.register);

// @route POST /auth/login
// @desc Login user
// @access Public
router.post("/login", authController.login);

module.exports = router;
