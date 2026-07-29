const {
    createPayment,
    getPayments,
    getPaymentById,
    updatePayment,
    deletePayment
} = require("../models/paymentModel");

// Create Payment
const addPayment = (req, res) => {

    try {

        const company_id = req.user.company_id;

        const {
            supplier_id,
            payment_date,
            amount,
            payment_mode,
            reference_no,
            remarks
        } = req.body;

        if (!supplier_id || !payment_date || !amount) {
            return res.status(400).json({
                success: false,
                message: "Supplier, Date and Amount are required"
            });
        }

        createPayment(
            {
                company_id,
                supplier_id,
                payment_date,
                amount,
                payment_mode: payment_mode || "Cash",
                reference_no,
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

                return res.status(201).json({
                    success: true,
                    message: "Payment Added Successfully",
                    paymentId: result.insertId
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

// Get All Payments
const getAllPayments = (req, res) => {

    getPayments(
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
                payments: result
            });

        }
    );

};

// Get Payment By ID
const getSinglePayment = (req, res) => {

    const paymentId = req.params.id;

    getPaymentById(
        paymentId,
        req.user.company_id,
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
                    message: "Payment not found"
                });
            }

            return res.status(200).json({
                success: true,
                payment: result[0]
            });

        }
    );

};

// Update Payment
const editPayment = (req, res) => {

    const paymentId = req.params.id;

    updatePayment(
        paymentId,
        req.user.company_id,
        req.user.id,
        req.body,
        (err, result) => {

            if (err) {
                return res.status(500).json({
                    success: false,
                    message: err.message
                });
            }

            if (result.affectedRows === 0) {
                return res.status(404).json({
                    success: false,
                    message: "Payment not found"
                });
            }

            return res.status(200).json({
                success: true,
                message: "Payment Updated Successfully"
            });

        }
    );

};

// Delete Payment
const removePayment = (req, res) => {

    const paymentId = req.params.id;

    deletePayment(
        paymentId,
        req.user.company_id,
        req.user.id,
        (err, result) => {

            if (err) {
                return res.status(500).json({
                    success: false,
                    message: err.message
                });
            }

            if (result.affectedRows === 0) {
                return res.status(404).json({
                    success: false,
                    message: "Payment not found"
                });
            }

            return res.status(200).json({
                success: true,
                message: "Payment Deleted Successfully"
            });

        }
    );

};

module.exports = {
    addPayment,
    getAllPayments,
    getSinglePayment,
    editPayment,
    removePayment
};