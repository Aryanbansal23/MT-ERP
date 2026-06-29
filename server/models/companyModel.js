const db = require("../config/db");

// Create Company
const createCompany = (companyData, callback) => {
    const {
        company_name,
        owner_name,
        email,
        phone,
        gst_number,
        pan_number,
        address,
        state,
        country,
        pincode,
        financial_year,
        created_by
    } = companyData;

    const sql = `
        INSERT INTO companies (
            company_name,
            owner_name,
            email,
            phone,
            gst_number,
            pan_number,
            address,
            state,
            country,
            pincode,
            financial_year,
            created_by
        )
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

    db.query(
        sql,
        [
            company_name,
            owner_name,
            email,
            phone,
            gst_number,
            pan_number,
            address,
            state,
            country,
            pincode,
            financial_year,
            created_by
        ],
        callback
    );
};

// Get All Companies
const getCompanies = (userId, callback) => {
    const sql = `
        SELECT *
        FROM companies
        WHERE created_by = ?
        ORDER BY id DESC
    `;

    db.query(sql, [userId], callback);
};

// Get Company By ID
const getCompanyById = (companyId, userId, callback) => {
    const sql = `
        SELECT *
        FROM companies
        WHERE id = ? AND created_by = ?
    `;

    db.query(sql, [companyId, userId], callback);
};

// Update Company
const updateCompany = (companyId, userId, companyData, callback) => {
    const {
        company_name,
        owner_name,
        email,
        phone,
        gst_number,
        pan_number,
        address,
        state,
        country,
        pincode,
        financial_year
    } = companyData;

    const sql = `
        UPDATE companies
        SET
            company_name = ?,
            owner_name = ?,
            email = ?,
            phone = ?,
            gst_number = ?,
            pan_number = ?,
            address = ?,
            state = ?,
            country = ?,
            pincode = ?,
            financial_year = ?
        WHERE id = ? AND created_by = ?
    `;

    db.query(
        sql,
        [
            company_name,
            owner_name,
            email,
            phone,
            gst_number,
            pan_number,
            address,
            state,
            country,
            pincode,
            financial_year,
            companyId,
            userId
        ],
        callback
    );
};

// Delete Company
const deleteCompany = (companyId, userId, callback) => {
    const sql = `
        DELETE FROM companies
        WHERE id = ? AND created_by = ?
    `;

    db.query(sql, [companyId, userId], callback);
};

module.exports = {
    createCompany,
    getCompanies,
    getCompanyById,
    updateCompany,
    deleteCompany
};