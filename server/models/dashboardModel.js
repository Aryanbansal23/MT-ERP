const db = require("../config/db");

// Dashboard Summary
const getDashboardSummary = (companyId, userId, callback) => {

    const sql = `
        SELECT
            (
                SELECT COUNT(*)
                FROM customers
                WHERE company_id = ?
                AND created_by = ?
            ) AS totalCustomers,

            (
                SELECT COUNT(*)
                FROM suppliers
                WHERE company_id = ?
                AND created_by = ?
            ) AS totalSuppliers,

            (
                SELECT COUNT(*)
                FROM products
                WHERE company_id = ?
                AND created_by = ?
            ) AS totalProducts,

            (
                SELECT COUNT(*)
                FROM stock
                WHERE company_id = ?
                AND quantity <= 10
                AND created_by = ?
            ) AS lowStockProducts,

            (
                SELECT IFNULL(SUM(grand_total),0)
                FROM purchases
                WHERE company_id = ?
                AND created_by = ?
            ) AS totalPurchases,

            (
                SELECT IFNULL(SUM(grand_total),0)
                FROM sales
                WHERE company_id = ?
                AND created_by = ?
            ) AS totalSales,

            (
                SELECT IFNULL(SUM(amount),0)
                FROM expenses
                WHERE company_id = ?
                AND created_by = ?
            ) AS totalExpenses
    `;

    db.query(
        sql,
        [
            companyId, userId,
            companyId, userId,
            companyId, userId,
            companyId, userId,
            companyId, userId,
            companyId, userId,
            companyId, userId
        ],
        callback
    );

};

// Monthly Sales
const getMonthlySales = (companyId, userId, callback) => {

    const sql = `
        SELECT
            MONTH(sale_date) AS month,
            SUM(grand_total) AS total
        FROM sales
        WHERE company_id = ?
        AND created_by = ?
        GROUP BY MONTH(sale_date)
        ORDER BY MONTH(sale_date)
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

// Monthly Purchases
const getMonthlyPurchases = (companyId, userId, callback) => {

    const sql = `
        SELECT
            MONTH(purchase_date) AS month,
            SUM(grand_total) AS total
        FROM purchases
        WHERE company_id = ?
        AND created_by = ?
        GROUP BY MONTH(purchase_date)
        ORDER BY MONTH(purchase_date)
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

// Recent Sales
const getRecentSales = (companyId, userId, callback) => {

    const sql = `
        SELECT
            invoice_no,
            grand_total,
            sale_date
        FROM sales
        WHERE company_id = ?
        AND created_by = ?
        ORDER BY id DESC
        LIMIT 5
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

// Recent Purchases
const getRecentPurchases = (companyId, userId, callback) => {

    const sql = `
        SELECT
            invoice_no,
            grand_total,
            purchase_date
        FROM purchases
        WHERE company_id = ?
        AND created_by = ?
        ORDER BY id DESC
        LIMIT 5
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

// Low Stock Products
const getLowStockProducts = (companyId, userId, callback) => {

    const sql = `
        SELECT
            p.product_name,
            p.product_code,
            s.quantity
        FROM stock s
        JOIN products p
            ON s.product_id = p.id
        WHERE s.company_id = ?
        AND s.created_by = ?
        AND s.quantity <= 10
        ORDER BY s.quantity ASC
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

module.exports = {
    getDashboardSummary,
    getMonthlySales,
    getMonthlyPurchases,
    getRecentSales,
    getRecentPurchases,
    getLowStockProducts
};