const express = require("express");
const router = express.Router();

const verifyToken = require("../middleware/authMiddleware");

const {
    addExpense,
    getAllExpenses,
    getSingleExpense,
    editExpense,
    removeExpense
} = require("../controllers/expenseController");

// Create Expense
router.post("/create", verifyToken, addExpense);

// Get All Expenses
router.get("/", verifyToken, getAllExpenses);

// Get Expense By ID
router.get("/:id", verifyToken, getSingleExpense);

// Update Expense
router.put("/:id", verifyToken, editExpense);

// Delete Expense
router.delete("/:id", verifyToken, removeExpense);

module.exports = router;