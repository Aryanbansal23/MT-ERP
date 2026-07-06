const db = require("../config/db");

// Create Expense
const createExpense = (expenseData, callback) => {

    const {
        company_id,
        expense_date,
        category,
        amount,
        payment_mode,
        remarks,
        created_by
    } = expenseData;

    const sql = `
        INSERT INTO expenses (
            company_id,
            expense_date,
            category,
            amount,
            payment_mode,
            remarks,
            created_by
        )
        VALUES (?, ?, ?, ?, ?, ?, ?)
    `;

    db.query(
        sql,
        [
            company_id,
            expense_date,
            category,
            amount,
            payment_mode,
            remarks,
            created_by
        ],
        callback
    );

};

// Get All Expenses
const getExpenses = (userId, callback) => {

    const sql = `
        SELECT *
        FROM expenses
        WHERE created_by = ?
        ORDER BY id DESC
    `;

    db.query(sql, [userId], callback);

};

// Get Expense By ID
const getExpenseById = (expenseId, userId, callback) => {

    const sql = `
        SELECT *
        FROM expenses
        WHERE id = ?
        AND created_by = ?
    `;

    db.query(sql, [expenseId, userId], callback);

};

// Update Expense
const updateExpense = (expenseId, userId, expenseData, callback) => {

    const {
        expense_date,
        category,
        amount,
        payment_mode,
        remarks
    } = expenseData;

    const sql = `
        UPDATE expenses
        SET
            expense_date = ?,
            category = ?,
            amount = ?,
            payment_mode = ?,
            remarks = ?
        WHERE id = ?
        AND created_by = ?
    `;

    db.query(
        sql,
        [
            expense_date,
            category,
            amount,
            payment_mode,
            remarks,
            expenseId,
            userId
        ],
        callback
    );

};

// Delete Expense
const deleteExpense = (expenseId, userId, callback) => {

    const sql = `
        DELETE FROM expenses
        WHERE id = ?
        AND created_by = ?
    `;

    db.query(sql, [expenseId, userId], callback);

};

module.exports = {
    createExpense,
    getExpenses,
    getExpenseById,
    updateExpense,
    deleteExpense
};