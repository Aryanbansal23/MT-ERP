const {
    createSale,
    createSaleItem,
    getSales
} = require("../models/saleModel");

const {
    getStockByProduct,
    decreaseStock,
    createStockTransaction
} = require("../models/stockModel");

// Create Sale
const addSale = (req, res) => {

    try {

        const {
            company_id,
            customer_id,
            invoice_no,
            sale_date,
            total_amount,
            gst_amount,
            grand_total,
            remarks,
            items
        } = req.body;

        if (
            !company_id ||
            !customer_id ||
            !invoice_no ||
            !sale_date ||
            !items ||
            items.length === 0
        ) {
            return res.status(400).json({
                success: false,
                message: "Required fields are missing"
            });
        }

        createSale(
            {
                company_id,
                customer_id,
                invoice_no,
                sale_date,
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

                const saleId = result.insertId;
                let completed = 0;

                for (const item of items) {

                    getStockByProduct(item.product_id, req.user.id, (err, stockResult) => {

                        if (err) {
                            return res.status(500).json({
                                success: false,
                                message: err.message
                            });
                        }

                        if (stockResult.length === 0) {
                            return res.status(404).json({
                                success: false,
                                message: "Stock not found"
                            });
                        }

                        const currentStock = Number(stockResult[0].quantity);

                        if (currentStock < item.quantity) {
                            return res.status(400).json({
                                success: false,
                                message: `Insufficient stock for product ${item.product_id}`
                            });
                        }

                        createSaleItem(
                            {
                                sale_id: saleId,
                                product_id: item.product_id,
                                quantity: item.quantity,
                                selling_price: item.selling_price,
                                amount: item.amount
                            },
                            (err) => {

                                if (err) {
                                    return res.status(500).json({
                                        success: false,
                                        message: err.message
                                    });
                                }

                                decreaseStock(
                                    item.product_id,
                                    req.user.id,
                                    item.quantity,
                                    () => {}
                                );

                                createStockTransaction(
                                    {
                                        product_id: item.product_id,
                                        company_id,
                                        transaction_type: "SALE",
                                        quantity: item.quantity,
                                        remarks: invoice_no,
                                        created_by: req.user.id
                                    },
                                    () => {}
                                );

                                completed++;

                                if (completed === items.length) {
                                    res.status(201).json({
                                        success: true,
                                        message: "Sale Created Successfully",
                                        saleId
                                    });
                                }

                            }
                        );

                    });

                }

            }
        );

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }

};

// Get All Sales
const getAllSales = (req, res) => {

    getSales(req.user.id, (err, result) => {

        if (err) {
            return res.status(500).json({
                success: false,
                message: err.message
            });
        }

        res.status(200).json({
            success: true,
            count: result.length,
            sales: result
        });

    });

};

module.exports = {
    addSale,
    getAllSales
};