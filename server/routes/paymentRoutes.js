const express = require("express");
const router = express.Router();

const verifyToken = require("../middleware/verifyToken");

const {
    addPayment,
    getAllPayments,
    getSinglePayment,
    editPayment,
    removePayment
} = require("../controllers/paymentController");

// Create Payment
router.post("/create", verifyToken, addPayment);

// Get All Payments
router.get("/", verifyToken, getAllPayments);

// Get Payment By ID
router.get("/:id", verifyToken, getSinglePayment);

// Update Payment
router.put("/:id", verifyToken, editPayment);

// Delete Payment
router.delete("/:id", verifyToken, removePayment);

module.exports = router;