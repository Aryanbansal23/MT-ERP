const {
    createExpense,
    getExpenses,
    getExpenseById,
    updateExpense,
    deleteExpense
} = require("../models/expenseModel");

// Create Expense
const addExpense = (req, res) => {

    try {

        const {
            company_id,
            expense_date,
            category,
            amount,
            payment_mode,
            remarks
        } = req.body;

        if (!company_id || !expense_date || !category || !amount) {
            return res.status(400).json({
                success: false,
                message: "Company, Date, Category and Amount are required"
            });
        }

        createExpense(
            {
                company_id,
                expense_date,
                category,
                amount,
                payment_mode: payment_mode || "Cash",
                remarks,
                created_by: req.user.id
            },
            (err, result) => {

                if (err) {
                    return res.status(500).json({
                        success: false,
                        message: err.message
                    });
                }

                res.status(201).json({
                    success: true,
                    message: "Expense Added Successfully",
                    expenseId: result.insertId
                });

            }
        );

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }

};

// Get All Expenses
const getAllExpenses = (req, res) => {

    getExpenses(req.user.id, (err, result) => {

        if (err) {
            return res.status(500).json({
                success: false,
                message: err.message
            });
        }

        res.status(200).json({
            success: true,
            count: result.length,
            expenses: result
        });

    });

};

// Get Expense By ID
const getSingleExpense = (req, res) => {

    const expenseId = req.params.id;

    getExpenseById(expenseId, req.user.id, (err, result) => {

        if (err) {
            return res.status(500).json({
                success: false,
                message: err.message
            });
        }

        if (result.length === 0) {
            return res.status(404).json({
                success: false,
                message: "Expense not found"
            });
        }

        res.status(200).json({
            success: true,
            expense: result[0]
        });

    });

};

// Update Expense
const editExpense = (req, res) => {

    const expenseId = req.params.id;

    updateExpense(expenseId, req.user.id, req.body, (err, result) => {

        if (err) {
            return res.status(500).json({
                success: false,
                message: err.message
            });
        }

        if (result.affectedRows === 0) {
            return res.status(404).json({
                success: false,
                message: "Expense not found"
            });
        }

        res.status(200).json({
            success: true,
            message: "Expense Updated Successfully"
        });

    });

};

// Delete Expense
const removeExpense = (req, res) => {

    const expenseId = req.params.id;

    deleteExpense(expenseId, req.user.id, (err, result) => {

        if (err) {
            return res.status(500).json({
                success: false,
                message: err.message
            });
        }

        if (result.affectedRows === 0) {
            return res.status(404).json({
                success: false,
                message: "Expense not found"
            });
        }

        res.status(200).json({
            success: true,
            message: "Expense Deleted Successfully"
        });

    });

};

module.exports = {
    addExpense,
    getAllExpenses,
    getSingleExpense,
    editExpense,
    removeExpense
};