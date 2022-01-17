const express = require("express");
const router = express.Router();
const userController = require("../controllers/user_controller");
const authMiddleware = require("../middleware/auth_middleware");

// @route GET /user/profile
// @desc Get user profile
// @access Private
router.get("/profile", authMiddleware, userController.profile);

module.exports = router;
