const express = require("express");
const router = express.Router();

const { register, login } = require("../controllers/authController");
const verifyToken = require("../middleware/verifyToken");

// Public Route
router.post("/login", login);

// Protected Route (Only Logged-in User Can Create New Users)
router.post("/register", verifyToken, register);

module.exports = router;