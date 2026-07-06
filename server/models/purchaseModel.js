const db = require("../config/db");

// Create Purchase
const createPurchase = (purchaseData, callback) => {

    const {
        company_id,
        supplier_id,
        invoice_no,
        purchase_date,
        total_amount,
        gst_amount,
        grand_total,
        remarks,
        created_by
    } = purchaseData;

    const sql = `
        INSERT INTO purchases (
            company_id,
            supplier_id,
            invoice_no,
            purchase_date,
            total_amount,
            gst_amount,
            grand_total,
            remarks,
            created_by
        )
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

    db.query(sql, [
        company_id,
        supplier_id,
        invoice_no,
        purchase_date,
        total_amount,
        gst_amount,
        grand_total,
        remarks,
        created_by
    ], callback);

};

// Create Purchase Item
const createPurchaseItem = (itemData, callback) => {

    const {
        purchase_id,
        product_id,
        quantity,
        purchase_price,
        amount
    } = itemData;

    const sql = `
        INSERT INTO purchase_items (
            purchase_id,
            product_id,
            quantity,
            purchase_price,
            amount
        )
        VALUES (?, ?, ?, ?, ?)
    `;

    db.query(sql, [
        purchase_id,
        product_id,
        quantity,
        purchase_price,
        amount
    ], callback);

};

// Get All Purchases
const getPurchases = (userId, callback) => {

    const sql = `
        SELECT
            p.*,
            s.supplier_name
        FROM purchases p
        JOIN suppliers s
            ON p.supplier_id = s.id
        WHERE p.created_by = ?
        ORDER BY p.id DESC
    `;

    db.query(sql, [userId], callback);

};

module.exports = {
    createPurchase,
    createPurchaseItem,
    getPurchases
};