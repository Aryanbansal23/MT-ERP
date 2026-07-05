const {
    createProduct,
    getProducts,
    getProductById,
    updateProduct,
    deleteProduct
} = require("../models/productModel");

// Create Product
const addProduct = (req, res) => {
    try {
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
        } = req.body;

        if (!company_id || !category_id || !unit_id || !product_name) {
            return res.status(400).json({
                success: false,
                message: "Company, Category, Unit and Product Name are required"
            });
        }

        createProduct(
            {
                company_id,
                category_id,
                unit_id,
                product_name,
                product_code,
                hsn_code,
                gst_percentage: gst_percentage || 18,
                purchase_price: purchase_price || 0,
                selling_price: selling_price || 0,
                opening_stock: opening_stock || 0,
                minimum_stock: minimum_stock || 0,
                barcode,
                description,
                created_by: req.user.id
            },
            (err, result) => {

                if (err) {
                    return res.status(500).json({
                        success: false,
                        message: err.message
                    });
                }

                res.status(201).json({
                    success: true,
                    message: "Product Created Successfully",
                    productId: result.insertId
                });

            }
        );

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }
};

// Get All Products
const getAllProducts = (req, res) => {

    getProducts(req.user.id, (err, result) => {

        if (err) {
            return res.status(500).json({
                success: false,
                message: err.message
            });
        }

        res.status(200).json({
            success: true,
            count: result.length,
            products: result
        });

    });

};

// Get Product By ID
const getSingleProduct = (req, res) => {

    const productId = req.params.id;

    getProductById(productId, req.user.id, (err, result) => {

        if (err) {
            return res.status(500).json({
                success: false,
                message: err.message
            });
        }

        if (result.length === 0) {
            return res.status(404).json({
                success: false,
                message: "Product not found"
            });
        }

        res.status(200).json({
            success: true,
            product: result[0]
        });

    });

};

// Update Product
const editProduct = (req, res) => {

    const productId = req.params.id;

    updateProduct(productId, req.user.id, req.body, (err, result) => {

        if (err) {
            return res.status(500).json({
                success: false,
                message: err.message
            });
        }

        if (result.affectedRows === 0) {
            return res.status(404).json({
                success: false,
                message: "Product not found"
            });
        }

        res.status(200).json({
            success: true,
            message: "Product Updated Successfully"
        });

    });

};

// Delete Product
const removeProduct = (req, res) => {

    const productId = req.params.id;

    deleteProduct(productId, req.user.id, (err, result) => {

        if (err) {
            return res.status(500).json({
                success: false,
                message: err.message
            });
        }

        if (result.affectedRows === 0) {
            return res.status(404).json({
                success: false,
                message: "Product not found"
            });
        }

        res.status(200).json({
            success: true,
            message: "Product Deleted Successfully"
        });

    });

};

module.exports = {
    addProduct,
    getAllProducts,
    getSingleProduct,
    editProduct,
    removeProduct
};