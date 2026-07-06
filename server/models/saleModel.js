const db = require("../config/db");

// Create Sale
const createSale = (saleData, callback) => {

    const {
        company_id,
        customer_id,
        invoice_no,
        sale_date,
        total_amount,
        gst_amount,
        grand_total,
        remarks,
        created_by
    } = saleData;

    const sql = `
        INSERT INTO sales (
            company_id,
            customer_id,
            invoice_no,
            sale_date,
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
        customer_id,
        invoice_no,
        sale_date,
        total_amount,
        gst_amount,
        grand_total,
        remarks,
        created_by
    ], callback);

};

// Create Sale Item
const createSaleItem = (itemData, callback) => {

    const {
        sale_id,
        product_id,
        quantity,
        selling_price,
        amount
    } = itemData;

    const sql = `
        INSERT INTO sales_items (
            sale_id,
            product_id,
            quantity,
            selling_price,
            amount
        )
        VALUES (?, ?, ?, ?, ?)
    `;

    db.query(sql, [
        sale_id,
        product_id,
        quantity,
        selling_price,
        amount
    ], callback);

};

// Get All Sales
const getSales = (userId, callback) => {

    const sql = `
        SELECT
            s.*,
            c.customer_name
        FROM sales s
        JOIN customers c
            ON s.customer_id = c.id
        WHERE s.created_by = ?
        ORDER BY s.id DESC
    `;

    db.query(sql, [userId], callback);

};

module.exports = {
    createSale,
    createSaleItem,
    getSales
};