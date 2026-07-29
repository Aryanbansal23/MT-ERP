const db = require("../config/db");

// Create Customer
const createCustomer = (customerData, callback) => {

    const {
        company_id,
        customer_name,
        mobile,
        email,
        gst_number,
        pan_number,
        address,
        city,
        state,
        pincode,
        opening_balance,
        balance_type,
        created_by
    } = customerData;

    const sql = `
        INSERT INTO customers (
            company_id,
            customer_name,
            mobile,
            email,
            gst_number,
            pan_number,
            address,
            city,
            state,
            pincode,
            opening_balance,
            balance_type,
            created_by
        )
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

    db.query(
        sql,
        [
            company_id,
            customer_name,
            mobile,
            email,
            gst_number,
            pan_number,
            address,
            city,
            state,
            pincode,
            opening_balance,
            balance_type,
            created_by
        ],
        callback
    );
};

// Get All Customers
const getCustomers = (companyId, userId, callback) => {

    const sql = `
        SELECT *
        FROM customers
        WHERE company_id = ?
        AND created_by = ?
        ORDER BY id DESC
    `;

    db.query(sql, [companyId, userId], callback);

};

// Get Customer By ID
const getCustomerById = (customerId, companyId, userId, callback) => {

    const sql = `
        SELECT *
        FROM customers
        WHERE id = ?
        AND company_id = ?
        AND created_by = ?
    `;

    db.query(sql, [customerId, companyId, userId], callback);

};

// Update Customer
const updateCustomer = (
    customerId,
    companyId,
    userId,
    customerData,
    callback
) => {

    const {
        customer_name,
        mobile,
        email,
        gst_number,
        pan_number,
        address,
        city,
        state,
        pincode,
        opening_balance,
        balance_type
    } = customerData;

    const sql = `
        UPDATE customers
        SET
            customer_name = ?,
            mobile = ?,
            email = ?,
            gst_number = ?,
            pan_number = ?,
            address = ?,
            city = ?,
            state = ?,
            pincode = ?,
            opening_balance = ?,
            balance_type = ?
        WHERE id = ?
        AND company_id = ?
        AND created_by = ?
    `;

    db.query(
        sql,
        [
            customer_name,
            mobile,
            email,
            gst_number,
            pan_number,
            address,
            city,
            state,
            pincode,
            opening_balance,
            balance_type,
            customerId,
            companyId,
            userId
        ],
        callback
    );

};

// Delete Customer
const deleteCustomer = (
    customerId,
    companyId,
    userId,
    callback
) => {

    const sql = `
        DELETE FROM customers
        WHERE id = ?
        AND company_id = ?
        AND created_by = ?
    `;

    db.query(
        sql,
        [
            customerId,
            companyId,
            userId
        ],
        callback
    );

};

module.exports = {
    createCustomer,
    getCustomers,
    getCustomerById,
    updateCustomer,
    deleteCustomer
};