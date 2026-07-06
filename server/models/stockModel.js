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
const getStock = (userId, callback) => {

    const sql = `
        SELECT
            s.*,
            p.product_name,
            p.product_code
        FROM stock s
        JOIN products p
            ON s.product_id = p.id
        WHERE s.created_by = ?
        ORDER BY s.id DESC
    `;

    db.query(sql, [userId], callback);

};

// Get Stock By Product
const getStockByProduct = (productId, userId, callback) => {

    const sql = `
        SELECT *
        FROM stock
        WHERE product_id = ?
        AND created_by = ?
    `;

    db.query(sql, [productId, userId], callback);

};

// Update Stock Quantity
const updateStock = (productId, userId, quantity, callback) => {

    const sql = `
        UPDATE stock
        SET quantity = ?
        WHERE product_id = ?
        AND created_by = ?
    `;

    db.query(
        sql,
        [
            quantity,
            productId,
            userId
        ],
        callback
    );

};

// Increase Stock
const increaseStock = (productId, userId, quantity, callback) => {

    const sql = `
        UPDATE stock
        SET quantity = quantity + ?
        WHERE product_id = ?
        AND created_by = ?
    `;

    db.query(
        sql,
        [
            quantity,
            productId,
            userId
        ],
        callback
    );

};

// ⭐ Decrease Stock
const decreaseStock = (productId, userId, quantity, callback) => {

    const sql = `
        UPDATE stock
        SET quantity = quantity - ?
        WHERE product_id = ?
        AND created_by = ?
    `;

    db.query(
        sql,
        [
            quantity,
            productId,
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
const getStockHistory = (productId, userId, callback) => {

    const sql = `
        SELECT *
        FROM stock_transactions
        WHERE product_id = ?
        AND created_by = ?
        ORDER BY created_at DESC
    `;

    db.query(sql, [productId, userId], callback);

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