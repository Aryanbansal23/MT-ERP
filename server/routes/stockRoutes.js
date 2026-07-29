const express = require("express");
const router = express.Router();

const verifyToken = require("../middleware/verifyToken");

const {
    addOpeningStock,
    getAllStock,
    getProductStockHistory,
    stockIn,
    stockOut
} = require("../controllers/stockController");

// Opening Stock
router.post("/opening", verifyToken, addOpeningStock);

// Stock In (Purchase)
router.post("/in", verifyToken, stockIn);

// Stock Out (Sale)
router.post("/out", verifyToken, stockOut);

// Get All Stock
router.get("/", verifyToken, getAllStock);

// Get Stock History
router.get("/history/:productId", verifyToken, getProductStockHistory);

module.exports = router;