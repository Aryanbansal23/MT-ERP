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

    db.query(
        sql,
        [
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
        ],
        callback
    );

};

// Get All Products
const getProducts = (companyId, userId, callback) => {

    const sql = `
        SELECT
            p.*,
            c.category_name,
            u.unit_name,
            u.short_name
        FROM products p
        INNER JOIN categories c
            ON p.category_id = c.id
        INNER JOIN units u
            ON p.unit_id = u.id
        WHERE p.company_id = ?
        AND p.created_by = ?
        ORDER BY p.id DESC
    `;

    db.query(sql, [companyId, userId], callback);

};

// Get Product By ID
const getProductById = (productId, companyId, userId, callback) => {

    const sql = `
        SELECT
            p.*,
            c.category_name,
            u.unit_name,
            u.short_name
        FROM products p
        INNER JOIN categories c
            ON p.category_id = c.id
        INNER JOIN units u
            ON p.unit_id = u.id
        WHERE p.id = ?
        AND p.company_id = ?
        AND p.created_by = ?
    `;

    db.query(
        sql,
        [
            productId,
            companyId,
            userId
        ],
        callback
    );

};

// Update Product
const updateProduct = (
    productId,
    companyId,
    userId,
    productData,
    callback
) => {

    const {
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
            category_id = ?,
            unit_id = ?,
            product_name = ?,
            product_code = ?,
            hsn_code = ?,
            gst_percentage = ?,
            purchase_price = ?,
            selling_price = ?,
            opening_stock = ?,
            minimum_stock = ?,
            barcode = ?,
            description = ?
        WHERE id = ?
        AND company_id = ?
        AND created_by = ?
    `;

    db.query(
        sql,
        [
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
            companyId,
            userId
        ],
        callback
    );

};

// Delete Product
const deleteProduct = (
    productId,
    companyId,
    userId,
    callback
) => {

    const sql = `
        DELETE FROM products
        WHERE id = ?
        AND company_id = ?
        AND created_by = ?
    `;

    db.query(
        sql,
        [
            productId,
            companyId,
            userId
        ],
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