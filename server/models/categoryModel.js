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

    db.query(sql, [
        company_id,
        category_name,
        description,
        created_by
    ], callback);
};

// Get All Categories
const getCategories = (userId, callback) => {

    const sql = `
        SELECT *
        FROM categories
        WHERE created_by = ?
        ORDER BY id DESC
    `;

    db.query(sql, [userId], callback);
};

// Get Category By ID
const getCategoryById = (categoryId, userId, callback) => {

    const sql = `
        SELECT *
        FROM categories
        WHERE id = ? AND created_by = ?
    `;

    db.query(sql, [categoryId, userId], callback);
};

// Update Category
const updateCategory = (categoryId, userId, categoryData, callback) => {

    const {
        company_id,
        category_name,
        description
    } = categoryData;

    const sql = `
        UPDATE categories
        SET
            company_id = ?,
            category_name = ?,
            description = ?
        WHERE id = ? AND created_by = ?
    `;

    db.query(sql, [
        company_id,
        category_name,
        description,
        categoryId,
        userId
    ], callback);
};

// Delete Category
const deleteCategory = (categoryId, userId, callback) => {

    const sql = `
        DELETE FROM categories
        WHERE id = ? AND created_by = ?
    `;

    db.query(sql, [categoryId, userId], callback);
};

module.exports = {
    createCategory,
    getCategories,
    getCategoryById,
    updateCategory,
    deleteCategory
};