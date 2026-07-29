const express = require("express");
const router = express.Router();

const verifyToken = require("../middleware/verifyToken");

const {
    addSale,
    getAllSales
} = require("../controllers/saleController");

// Create Sale
router.post("/create", verifyToken, addSale);

// Get All Sales
router.get("/", verifyToken, getAllSales);

module.exports = router;