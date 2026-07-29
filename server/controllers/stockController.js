const {
    createOpeningStock,
    getStock,
    getStockByProduct,
    increaseStock,
    decreaseStock,
    createStockTransaction,
    getStockHistory
} = require("../models/stockModel");

// Opening Stock
const addOpeningStock = (req, res) => {

    const company_id = req.user.company_id;

    const { product_id, quantity, remarks } = req.body;

    if (!product_id || quantity == null) {
        return res.status(400).json({
            success: false,
            message: "Product ID and Quantity are required"
        });
    }

    getStockByProduct(
        product_id,
        company_id,
        req.user.id,
        (err, result) => {

            if (err) {
                return res.status(500).json({
                    success: false,
                    message: err.message
                });
            }

            if (result.length > 0) {
                return res.status(400).json({
                    success: false,
                    message: "Opening stock already exists"
                });
            }

            createOpeningStock(
                {
                    product_id,
                    company_id,
                    quantity,
                    created_by: req.user.id
                },
                (err) => {

                    if (err) {
                        return res.status(500).json({
                            success: false,
                            message: err.message
                        });
                    }

                    createStockTransaction(
                        {
                            product_id,
                            company_id,
                            transaction_type: "OPENING",
                            quantity,
                            remarks: remarks || "Opening Stock",
                            created_by: req.user.id
                        },
                        (err) => {

                            if (err) {
                                return res.status(500).json({
                                    success: false,
                                    message: err.message
                                });
                            }

                            return res.status(201).json({
                                success: true,
                                message: "Opening Stock Added Successfully"
                            });

                        }
                    );

                }
            );

        }
    );

};

// Get All Stock
const getAllStock = (req, res) => {

    getStock(
        req.user.company_id,
        req.user.id,
        (err, result) => {

            if (err) {
                return res.status(500).json({
                    success: false,
                    message: err.message
                });
            }

            return res.json({
                success: true,
                count: result.length,
                stock: result
            });

        }
    );

};

// Stock History
const getProductStockHistory = (req, res) => {

    getStockHistory(
        req.params.productId,
        req.user.company_id,
        req.user.id,
        (err, result) => {

            if (err) {
                return res.status(500).json({
                    success: false,
                    message: err.message
                });
            }

            return res.json({
                success: true,
                count: result.length,
                history: result
            });

        }
    );

};

// Stock In
const stockIn = (req, res) => {

    const company_id = req.user.company_id;

    const { product_id, quantity, remarks } = req.body;

    if (!product_id || !quantity) {
        return res.status(400).json({
            success: false,
            message: "Product ID and Quantity are required"
        });
    }

    increaseStock(
        product_id,
        company_id,
        req.user.id,
        quantity,
        (err) => {

            if (err) {
                return res.status(500).json({
                    success: false,
                    message: err.message
                });
            }

            createStockTransaction(
                {
                    product_id,
                    company_id,
                    transaction_type: "PURCHASE",
                    quantity,
                    remarks: remarks || "Stock In",
                    created_by: req.user.id
                },
                (err) => {

                    if (err) {
                        return res.status(500).json({
                            success: false,
                            message: err.message
                        });
                    }

                    return res.json({
                        success: true,
                        message: "Stock Increased Successfully"
                    });

                }
            );

        }
    );

};

// Stock Out
const stockOut = (req, res) => {

    const company_id = req.user.company_id;

    const { product_id, quantity, remarks } = req.body;

    if (!product_id || !quantity) {
        return res.status(400).json({
            success: false,
            message: "Product ID and Quantity are required"
        });
    }

    getStockByProduct(
        product_id,
        company_id,
        req.user.id,
        (err, result) => {

            if (err) {
                return res.status(500).json({
                    success: false,
                    message: err.message
                });
            }

            if (result.length === 0) {
                return res.status(404).json({
                    success: false,
                    message: "Stock not found"
                });
            }

            const currentStock = Number(result[0].quantity);

            if (currentStock < Number(quantity)) {
                return res.status(400).json({
                    success: false,
                    message: "Insufficient stock"
                });
            }

            decreaseStock(
                product_id,
                company_id,
                req.user.id,
                quantity,
                (err) => {

                    if (err) {
                        return res.status(500).json({
                            success: false,
                            message: err.message
                        });
                    }

                    createStockTransaction(
                        {
                            product_id,
                            company_id,
                            transaction_type: "SALE",
                            quantity,
                            remarks: remarks || "Stock Out",
                            created_by: req.user.id
                        },
                        (err) => {

                            if (err) {
                                return res.status(500).json({
                                    success: false,
                                    message: err.message
                                });
                            }

                            return res.json({
                                success: true,
                                message: "Stock Decreased Successfully"
                            });

                        }
                    );

                }
            );

        }
    );

};

module.exports = {
    addOpeningStock,
    getAllStock,
    getProductStockHistory,
    stockIn,
    stockOut
};