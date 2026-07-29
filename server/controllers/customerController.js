const {
    createCustomer,
    getCustomers,
    getCustomerById,
    updateCustomer,
    deleteCustomer
} = require("../models/customerModel");

// Create Customer
const addCustomer = (req, res) => {
    try {

        const company_id = req.user.company_id;

        const {
            customer_name,
            mobile,
            email,
            gst_number,
            pan_number,
            address,
            city,
            state,
            pincode,
            opening_balance,
            balance_type
        } = req.body;

        if (!customer_name) {
            return res.status(400).json({
                success: false,
                message: "Customer Name is required"
            });
        }

        createCustomer(
            {
                company_id,
                customer_name,
                mobile,
                email,
                gst_number,
                pan_number,
                address,
                city,
                state,
                pincode,
                opening_balance: opening_balance || 0,
                balance_type: balance_type || "Dr",
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
                    message: "Customer Created Successfully",
                    customerId: result.insertId
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

// Get All Customers
const getAllCustomers = (req, res) => {

    getCustomers(
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
                customers: result
            });

        }
    );

};

// Get Customer By ID
const getSingleCustomer = (req, res) => {

    const customerId = req.params.id;

    getCustomerById(
        customerId,
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
                    message: "Customer not found"
                });
            }

            return res.status(200).json({
                success: true,
                customer: result[0]
            });

        }
    );

};

// Update Customer
const editCustomer = (req, res) => {

    const customerId = req.params.id;

    updateCustomer(
        customerId,
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
                    message: "Customer not found"
                });
            }

            return res.status(200).json({
                success: true,
                message: "Customer Updated Successfully"
            });

        }
    );

};

// Delete Customer
const removeCustomer = (req, res) => {

    const customerId = req.params.id;

    deleteCustomer(
        customerId,
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
                    message: "Customer not found"
                });
            }

            return res.status(200).json({
                success: true,
                message: "Customer Deleted Successfully"
            });

        }
    );

};

module.exports = {
    addCustomer,
    getAllCustomers,
    getSingleCustomer,
    editCustomer,
    removeCustomer
};