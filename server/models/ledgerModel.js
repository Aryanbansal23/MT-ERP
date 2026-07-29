const db = require("../config/db");

// Supplier Ledger
const getSupplierLedger = (
    supplierId,
    companyId,
    userId,
    callback
) => {

    const sql = `

        SELECT
            purchase_date AS date,
            invoice_no AS reference_no,
            'PURCHASE' AS type,
            grand_total AS debit,
            0 AS credit
        FROM purchases
        WHERE supplier_id = ?
        AND company_id = ?
        AND created_by = ?

        UNION ALL

        SELECT
            payment_date AS date,
            reference_no,
            'PAYMENT' AS type,
            0 AS debit,
            amount AS credit
        FROM payments
        WHERE supplier_id = ?
        AND company_id = ?
        AND created_by = ?

        ORDER BY date;

    `;

    db.query(
        sql,
        [
            supplierId,
            companyId,
            userId,
            supplierId,
            companyId,
            userId
        ],
        callback
    );

};

module.exports = {
    getSupplierLedger
};