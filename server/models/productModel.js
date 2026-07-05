const db = require("../config/db");

// Create Product
const createProduct = (productData, callback) => {

    const {
        company_id,
        category_id,
        unit_id,
        product_name,
        product_code,
        hsn_code,
        gst_percentage,
        purchase_price,
        selling_price,
        opening_stock,
        minimum_stock,
        barcode,
        description,
        created_by
    } = productData;

    const sql = `
        INSERT INTO products (
            company_id,
            category_id,
            unit_id,
            product_name,
            product_code,
            hsn_code,
            gst_percentage,
            purchase_price,
            selling_price,
            opening_stock,
            minimum_stock,
            barcode,
            description,
            created_by
        )
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

    db.query(sql, [
        company_id,
        category_id,
        unit_id,
        product_name,
        product_code,
        hsn_code,
        gst_percentage,
        purchase_price,
        selling_price,
        opening_stock,
        minimum_stock,
        barcode,
        description,
        created_by
    ], callback);

};

// Get All Products
const getProducts = (userId, callback) => {

    const sql = `
        SELECT
            p.*,
            c.category_name,
            u.unit_name,
            u.short_name
        FROM products p
        JOIN categories c ON p.category_id = c.id
        JOIN units u ON p.unit_id = u.id
        WHERE p.created_by = ?
        ORDER BY p.id DESC
    `;

    db.query(sql, [userId], callback);

};

// Get Product By ID
const getProductById = (productId, userId, callback) => {

    const sql = `
        SELECT *
        FROM products
        WHERE id = ? AND created_by = ?
    `;

    db.query(sql, [productId, userId], callback);

};

// Update Product
const updateProduct = (productId, userId, productData, callback) => {

    const {
        company_id,
        category_id,
        unit_id,
        product_name,
        product_code,
        hsn_code,
        gst_percentage,
        purchase_price,
        selling_price,
        opening_stock,
        minimum_stock,
        barcode,
        description
    } = productData;

    const sql = `
        UPDATE products
        SET
            company_id=?,
            category_id=?,
            unit_id=?,
            product_name=?,
            product_code=?,
            hsn_code=?,
            gst_percentage=?,
            purchase_price=?,
            selling_price=?,
            opening_stock=?,
            minimum_stock=?,
            barcode=?,
            description=?
        WHERE id=? AND created_by=?
    `;

    db.query(sql, [
        company_id,
        category_id,
        unit_id,
        product_name,
        product_code,
        hsn_code,
        gst_percentage,
        purchase_price,
        selling_price,
        opening_stock,
        minimum_stock,
        barcode,
        description,
        productId,
        userId
    ], callback);

};

// Delete Product
const deleteProduct = (productId, userId, callback) => {

    db.query(
        "DELETE FROM products WHERE id=? AND created_by=?",
        [productId, userId],
        callback
    );

};

module.exports = {
    createProduct,
    getProducts,
    getProductById,
    updateProduct,
    deleteProduct
};