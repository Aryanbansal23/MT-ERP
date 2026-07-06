const db = require("../config/db");

// Create Payment
const createPayment = (paymentData, callback) => {

    const {
        company_id,
        supplier_id,
        payment_date,
        amount,
        payment_mode,
        reference_no,
        remarks,
        created_by
    } = paymentData;

    const sql = `
        INSERT INTO payments (
            company_id,
            supplier_id,
            payment_date,
            amount,
            payment_mode,
            reference_no,
            remarks,
            created_by
        )
        VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `;

    db.query(
        sql,
        [
            company_id,
            supplier_id,
            payment_date,
            amount,
            payment_mode,
            reference_no,
            remarks,
            created_by
        ],
        callback
    );

};

// Get All Payments
const getPayments = (userId, callback) => {

    const sql = `
        SELECT
            p.*,
            s.supplier_name
        FROM payments p
        JOIN suppliers s
            ON p.supplier_id = s.id
        WHERE p.created_by = ?
        ORDER BY p.id DESC
    `;

    db.query(sql, [userId], callback);

};

// Get Payment By ID
const getPaymentById = (paymentId, userId, callback) => {

    const sql = `
        SELECT *
        FROM payments
        WHERE id = ?
        AND created_by = ?
    `;

    db.query(sql, [paymentId, userId], callback);

};

// Update Payment
const updatePayment = (paymentId, userId, paymentData, callback) => {

    const {
        payment_date,
        amount,
        payment_mode,
        reference_no,
        remarks
    } = paymentData;

    const sql = `
        UPDATE payments
        SET
            payment_date = ?,
            amount = ?,
            payment_mode = ?,
            reference_no = ?,
            remarks = ?
        WHERE id = ?
        AND created_by = ?
    `;

    db.query(
        sql,
        [
            payment_date,
            amount,
            payment_mode,
            reference_no,
            remarks,
            paymentId,
            userId
        ],
        callback
    );

};

// Delete Payment
const deletePayment = (paymentId, userId, callback) => {

    const sql = `
        DELETE FROM payments
        WHERE id = ?
        AND created_by = ?
    `;

    db.query(sql, [paymentId, userId], callback);

};

module.exports = {
    createPayment,
    getPayments,
    getPaymentById,
    updatePayment,
    deletePayment
};