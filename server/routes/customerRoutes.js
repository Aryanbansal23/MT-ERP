const express = require("express");
const router = express.Router();

const verifyToken = require("../middleware/verifyToken");

const {
    addCustomer,
    getAllCustomers,
    getSingleCustomer,
    editCustomer,
    removeCustomer
} = require("../controllers/customerController");

// Create Customer
router.post("/create", verifyToken, addCustomer);

// Get All Customers
router.get("/", verifyToken, getAllCustomers);

// Get Customer By ID
router.get("/:id", verifyToken, getSingleCustomer);

// Update Customer
router.put("/:id", verifyToken, editCustomer);

// Delete Customer
router.delete("/:id", verifyToken, removeCustomer);

module.exports = router;