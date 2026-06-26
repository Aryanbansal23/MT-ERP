const express = require("express");
const router = express.Router();

const verifyToken = require("../middleware/authMiddleware");

router.get("/", verifyToken, (req, res) => {
    res.status(200).json({
        success: true,
        message: "Welcome to MT ERP Dashboard",
        user: req.user
    });
});

module.exports = router;