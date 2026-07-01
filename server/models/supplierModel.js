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

    db.query(sql, [
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
    ], callback);
};

// Get All Suppliers
const getSuppliers = (userId, callback) => {
    db.query(
        "SELECT * FROM suppliers WHERE created_by = ? ORDER BY id DESC",
        [userId],
        callback
    );
};

// Get Supplier By ID
const getSupplierById = (supplierId, userId, callback) => {
    db.query(
        "SELECT * FROM suppliers WHERE id = ? AND created_by = ?",
        [supplierId, userId],
        callback
    );
};

// Update Supplier
const updateSupplier = (supplierId, userId, supplierData, callback) => {
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
        balance_type
    } = supplierData;

    const sql = `
        UPDATE suppliers
        SET
            company_id=?,
            supplier_name=?,
            mobile=?,
            email=?,
            gst_number=?,
            pan_number=?,
            address=?,
            city=?,
            state=?,
            pincode=?,
            opening_balance=?,
            balance_type=?
        WHERE id=? AND created_by=?
    `;

    db.query(sql, [
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
        supplierId,
        userId
    ], callback);
};

// Delete Supplier
const deleteSupplier = (supplierId, userId, callback) => {

    const sql = `
        DELETE FROM suppliers
        WHERE id = ? AND created_by = ?
    `;

    db.query(sql, [supplierId, userId], callback);

};

module.exports = {
    createSupplier,
    getSuppliers,
    getSupplierById,
    updateSupplier,
    deleteSupplier
};