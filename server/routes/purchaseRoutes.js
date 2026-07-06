const express = require("express");
const router = express.Router();

const verifyToken = require("../middleware/authMiddleware");

const {
    addPurchase,
    getAllPurchases
} = require("../controllers/purchaseController");

// Create Purchase
router.post("/create", verifyToken, addPurchase);

// Get All Purchases
router.get("/", verifyToken, getAllPurchases);

module.exports = router;