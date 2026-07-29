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
const getExpenses = (companyId, userId, callback) => {

    const sql = `
        SELECT *
        FROM expenses
        WHERE company_id = ?
        AND created_by = ?
        ORDER BY id DESC
    `;

    db.query(
        sql,
        [
            companyId,
            userId
        ],
        callback
    );

};

// Get Expense By ID
const getExpenseById = (
    expenseId,
    companyId,
    userId,
    callback
) => {

    const sql = `
        SELECT *
        FROM expenses
        WHERE id = ?
        AND company_id = ?
        AND created_by = ?
    `;

    db.query(
        sql,
        [
            expenseId,
            companyId,
            userId
        ],
        callback
    );

};

// Update Expense
const updateExpense = (
    expenseId,
    companyId,
    userId,
    expenseData,
    callback
) => {

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
        AND company_id = ?
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
            companyId,
            userId
        ],
        callback
    );

};

// Delete Expense
const deleteExpense = (
    expenseId,
    companyId,
    userId,
    callback
) => {

    const sql = `
        DELETE FROM expenses
        WHERE id = ?
        AND company_id = ?
        AND created_by = ?
    `;

    db.query(
        sql,
        [
            expenseId,
            companyId,
            userId
        ],
        callback
    );

};

module.exports = {
    createExpense,
    getExpenses,
    getExpenseById,
    updateExpense,
    deleteExpense
};