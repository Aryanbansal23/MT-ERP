const db = require("../config/db");

// Create Opening Stock
const createOpeningStock = (stockData, callback) => {

    const {
        product_id,
        company_id,
        quantity,
        created_by
    } = stockData;

    const sql = `
        INSERT INTO stock (
            product_id,
            company_id,
            quantity,
            created_by
        )
        VALUES (?, ?, ?, ?)
    `;

    db.query(
        sql,
        [
            product_id,
            company_id,
            quantity,
            created_by
        ],
        callback
    );

};

// Get All Stock
const getStock = (companyId, userId, callback) => {

    const sql = `
        SELECT
            s.*,
            p.product_name,
            p.product_code
        FROM stock s
        JOIN products p
            ON s.product_id = p.id
        WHERE s.company_id = ?
        AND s.created_by = ?
        ORDER BY s.id DESC
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

// Get Stock By Product
const getStockByProduct = (
    productId,
    companyId,
    userId,
    callback
) => {

    const sql = `
        SELECT *
        FROM stock
        WHERE product_id = ?
        AND company_id = ?
        AND created_by = ?
    `;

    db.query(
        sql,
        [
            productId,
            companyId,
            userId
        ],
        callback
    );

};

// Update Stock Quantity
const updateStock = (
    productId,
    companyId,
    userId,
    quantity,
    callback
) => {

    const sql = `
        UPDATE stock
        SET quantity = ?
        WHERE product_id = ?
        AND company_id = ?
        AND created_by = ?
    `;

    db.query(
        sql,
        [
            quantity,
            productId,
            companyId,
            userId
        ],
        callback
    );

};

// Increase Stock
const increaseStock = (
    productId,
    companyId,
    userId,
    quantity,
    callback
) => {

    const sql = `
        UPDATE stock
        SET quantity = quantity + ?
        WHERE product_id = ?
        AND company_id = ?
        AND created_by = ?
    `;

    db.query(
        sql,
        [
            quantity,
            productId,
            companyId,
            userId
        ],
        callback
    );

};

// Decrease Stock
const decreaseStock = (
    productId,
    companyId,
    userId,
    quantity,
    callback
) => {

    const sql = `
        UPDATE stock
        SET quantity = quantity - ?
        WHERE product_id = ?
        AND company_id = ?
        AND created_by = ?
    `;

    db.query(
        sql,
        [
            quantity,
            productId,
            companyId,
            userId
        ],
        callback
    );

};

// Create Stock Transaction
const createStockTransaction = (transactionData, callback) => {

    const {
        product_id,
        company_id,
        transaction_type,
        quantity,
        remarks,
        created_by
    } = transactionData;

    const sql = `
        INSERT INTO stock_transactions (
            product_id,
            company_id,
            transaction_type,
            quantity,
            remarks,
            created_by
        )
        VALUES (?, ?, ?, ?, ?, ?)
    `;

    db.query(
        sql,
        [
            product_id,
            company_id,
            transaction_type,
            quantity,
            remarks,
            created_by
        ],
        callback
    );

};

// Get Stock History
const getStockHistory = (
    productId,
    companyId,
    userId,
    callback
) => {

    const sql = `
        SELECT *
        FROM stock_transactions
        WHERE product_id = ?
        AND company_id = ?
        AND created_by = ?
        ORDER BY created_at DESC
    `;

    db.query(
        sql,
        [
            productId,
            companyId,
            userId
        ],
        callback
    );

};

module.exports = {
    createOpeningStock,
    getStock,
    getStockByProduct,
    updateStock,
    increaseStock,
    decreaseStock,
    createStockTransaction,
    getStockHistory
};