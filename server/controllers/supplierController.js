const {
    createSupplier,
    getSuppliers,
    getSupplierById,
    updateSupplier,
    deleteSupplier
} = require("../models/supplierModel");

// Create Supplier
const addSupplier = (req, res) => {
    try {

        const company_id = req.user.company_id;

        const {
            supplier_name,
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

        if (!supplier_name) {
            return res.status(400).json({
                success: false,
                message: "Supplier Name is required"
            });
        }

        createSupplier(
            {
                company_id,
                supplier_name,
                mobile,
                email,
                gst_number,
                pan_number,
                address,
                city,
                state,
                pincode,
                opening_balance: opening_balance || 0,
                balance_type: balance_type || "Cr",
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
                    message: "Supplier Created Successfully",
                    supplierId: result.insertId
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

// Get All Suppliers
const getAllSuppliers = (req, res) => {

    getSuppliers(
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
                suppliers: result
            });

        }
    );

};

// Get Supplier By ID
const getSingleSupplier = (req, res) => {

    const supplierId = req.params.id;

    getSupplierById(
        supplierId,
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
                    message: "Supplier not found"
                });
            }

            return res.status(200).json({
                success: true,
                supplier: result[0]
            });

        }
    );

};

// Update Supplier
const editSupplier = (req, res) => {

    const supplierId = req.params.id;

    updateSupplier(
        supplierId,
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
                    message: "Supplier not found"
                });
            }

            return res.status(200).json({
                success: true,
                message: "Supplier Updated Successfully"
            });

        }
    );

};

// Delete Supplier
const removeSupplier = (req, res) => {

    const supplierId = req.params.id;

    deleteSupplier(
        supplierId,
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
                    message: "Supplier not found"
                });
            }

            return res.status(200).json({
                success: true,
                message: "Supplier Deleted Successfully"
            });

        }
    );

};

module.exports = {
    addSupplier,
    getAllSuppliers,
    getSingleSupplier,
    editSupplier,
    removeSupplier
};