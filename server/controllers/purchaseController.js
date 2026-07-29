const {
    createPurchase,
    createPurchaseItem,
    getPurchases
} = require("../models/purchaseModel");

const {
    increaseStock,
    createStockTransaction
} = require("../models/stockModel");

// Create Purchase
const addPurchase = (req, res) => {

    try {

        const company_id = req.user.company_id;

        const {
            supplier_id,
            invoice_no,
            purchase_date,
            total_amount,
            gst_amount,
            grand_total,
            remarks,
            items
        } = req.body;

        if (
            !supplier_id ||
            !invoice_no ||
            !purchase_date ||
            !items ||
            items.length === 0
        ) {
            return res.status(400).json({
                success: false,
                message: "Required fields are missing"
            });
        }

        createPurchase(
            {
                company_id,
                supplier_id,
                invoice_no,
                purchase_date,
                total_amount,
                gst_amount,
                grand_total,
                remarks,
                created_by: req.user.id
            },
            (err, result) => {

                if (err) {
                    return res.status(500).json({
                        success: false,
                        message: err.message
                    });
                }

                const purchaseId = result.insertId;

                let completed = 0;

                items.forEach((item) => {

                    createPurchaseItem(
                        {
                            purchase_id: purchaseId,
                            product_id: item.product_id,
                            quantity: item.quantity,
                            purchase_price: item.purchase_price,
                            amount: item.amount
                        },
                        (err) => {

                            if (err) {
                                return res.status(500).json({
                                    success: false,
                                    message: err.message
                                });
                            }

                            // Increase Stock
                            increaseStock(
                                item.product_id,
                                company_id,
                                req.user.id,
                                item.quantity,
                                () => {}
                            );

                            // Create Stock Transaction
                            createStockTransaction(
                                {
                                    product_id: item.product_id,
                                    company_id,
                                    transaction_type: "PURCHASE",
                                    quantity: item.quantity,
                                    remarks: invoice_no,
                                    created_by: req.user.id
                                },
                                () => {}
                            );

                            completed++;

                            if (completed === items.length) {

                                return res.status(201).json({
                                    success: true,
                                    message: "Purchase Created Successfully",
                                    purchaseId
                                });

                            }

                        }
                    );

                });

            }
        );

    } catch (error) {

        return res.status(500).json({
            success: false,
            message: error.message
        });

    }

};

// Get All Purchases
const getAllPurchases = (req, res) => {

    getPurchases(
        req.user.company_id,
        req.user.id,
        (err, result) => {

            if (err) {
                return res.status(500).json({
                    success: false,
                    message: err.message
                });
            }

            return res.status(200).json({
                success: true,
                count: result.length,
                purchases: result
            });

        }
    );

};

module.exports = {
    addPurchase,
    getAllPurchases
};