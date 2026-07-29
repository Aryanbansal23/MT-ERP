const db = require("../config/db");

// Create Supplier
const createSupplier = (supplierData, callback) => {
    const {
        company_id,
        supplier_name,
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
    } = supplierData;

    const sql = `
        INSERT INTO suppliers (
            company_id,
            supplier_name,
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
            supplier_name,
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

// Get All Suppliers
const getSuppliers = (companyId, userId, callback) => {

    const sql = `
        SELECT *
        FROM suppliers
        WHERE company_id = ?
        AND created_by = ?
        ORDER BY id DESC
    `;

    db.query(sql, [companyId, userId], callback);
};

// Get Supplier By ID
const getSupplierById = (supplierId, companyId, userId, callback) => {

    const sql = `
        SELECT *
        FROM suppliers
        WHERE id = ?
        AND company_id = ?
        AND created_by = ?
    `;

    db.query(sql, [supplierId, companyId, userId], callback);
};

// Update Supplier
const updateSupplier = (
    supplierId,
    companyId,
    userId,
    supplierData,
    callback
) => {

    const {
        supplier_name,
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
    } = supplierData;

    const sql = `
        UPDATE suppliers
        SET
            supplier_name = ?,
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
            supplier_name,
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
            supplierId,
            companyId,
            userId
        ],
        callback
    );
};

// Delete Supplier
const deleteSupplier = (supplierId, companyId, userId, callback) => {

    const sql = `
        DELETE FROM suppliers
        WHERE id = ?
        AND company_id = ?
        AND created_by = ?
    `;

    db.query(sql, [supplierId, companyId, userId], callback);
};

module.exports = {
    createSupplier,
    getSuppliers,
    getSupplierById,
    updateSupplier,
    deleteSupplier
};