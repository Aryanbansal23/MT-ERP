const express = require("express");
const router = express.Router();

const verifyToken = require("../middleware/authMiddleware");

const {
    supplierLedger
} = require("../controllers/ledgerController");

// Supplier Ledger
router.get("/supplier/:supplierId", verifyToken, supplierLedger);

module.exports = router;