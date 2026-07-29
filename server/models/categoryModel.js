const db = require("../config/db");

// Create Category
const createCategory = (categoryData, callback) => {

    const {
        company_id,
        category_name,
        description,
        created_by
    } = categoryData;

    const sql = `
        INSERT INTO categories (
            company_id,
            category_name,
            description,
            created_by
        )
        VALUES (?, ?, ?, ?)
    `;

    db.query(
        sql,
        [
            company_id,
            category_name,
            description,
            created_by
        ],
        callback
    );

};

// Get All Categories
const getCategories = (companyId, userId, callback) => {

    const sql = `
        SELECT *
        FROM categories
        WHERE company_id = ?
        AND created_by = ?
        ORDER BY id DESC
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

// Get Category By ID
const getCategoryById = (
    categoryId,
    companyId,
    userId,
    callback
) => {

    const sql = `
        SELECT *
        FROM categories
        WHERE id = ?
        AND company_id = ?
        AND created_by = ?
    `;

    db.query(
        sql,
        [
            categoryId,
            companyId,
            userId
        ],
        callback
    );

};

// Update Category
const updateCategory = (
    categoryId,
    companyId,
    userId,
    categoryData,
    callback
) => {

    const {
        category_name,
        description
    } = categoryData;

    const sql = `
        UPDATE categories
        SET
            category_name = ?,
            description = ?
        WHERE id = ?
        AND company_id = ?
        AND created_by = ?
    `;

    db.query(
        sql,
        [
            category_name,
            description,
            categoryId,
            companyId,
            userId
        ],
        callback
    );

};

// Delete Category
const deleteCategory = (
    categoryId,
    companyId,
    userId,
    callback
) => {

    const sql = `
        DELETE FROM categories
        WHERE id = ?
        AND company_id = ?
        AND created_by = ?
    `;

    db.query(
        sql,
        [
            categoryId,
            companyId,
            userId
        ],
        callback
    );

};

module.exports = {
    createCategory,
    getCategories,
    getCategoryById,
    updateCategory,
    deleteCategory
};