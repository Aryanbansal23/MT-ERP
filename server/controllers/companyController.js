const {
    createCompany,
    getCompanies,
    getCompanyById,
    updateCompany,
    deleteCompany
} = require("../models/companyModel");

// Create Company
const addCompany = (req, res) => {
    try {
        const {
            company_name,
            owner_name,
            email,
            phone,
            gst_number,
            pan_number,
            address,
            state,
            country,
            pincode,
            financial_year
        } = req.body;

        if (!company_name || !owner_name) {
            return res.status(400).json({
                success: false,
                message: "Company Name and Owner Name are required"
            });
        }

        createCompany(
            {
                company_name,
                owner_name,
                email,
                phone,
                gst_number,
                pan_number,
                address,
                state,
                country: country || "India",
                pincode,
                financial_year,
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
                    message: "Company Created Successfully",
                    companyId: result.insertId
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

// Get All Companies
const getAllCompanies = (req, res) => {
    getCompanies(req.user.id, (err, result) => {
        if (err) {
            return res.status(500).json({
                success: false,
                message: err.message
            });
        }

        res.status(200).json({
            success: true,
            count: result.length,
            companies: result
        });
    });
};

// Get Company By ID
const getSingleCompany = (req, res) => {

    const companyId = req.params.id;

    getCompanyById(companyId, req.user.id, (err, result) => {

        if (err) {
            return res.status(500).json({
                success: false,
                message: err.message
            });
        }

        if (result.length === 0) {
            return res.status(404).json({
                success: false,
                message: "Company not found"
            });
        }

        res.status(200).json({
            success: true,
            company: result[0]
        });

    });

};

// Update Company
const editCompany = (req, res) => {

    const companyId = req.params.id;

    updateCompany(companyId, req.user.id, req.body, (err, result) => {

        if (err) {
            return res.status(500).json({
                success: false,
                message: err.message
            });
        }

        if (result.affectedRows === 0) {
            return res.status(404).json({
                success: false,
                message: "Company not found"
            });
        }

        res.status(200).json({
            success: true,
            message: "Company Updated Successfully"
        });

    });

};

// Delete Company
const removeCompany = (req, res) => {

    const companyId = req.params.id;

    deleteCompany(companyId, req.user.id, (err, result) => {

        if (err) {
            return res.status(500).json({
                success: false,
                message: err.message
            });
        }

        if (result.affectedRows === 0) {
            return res.status(404).json({
                success: false,
                message: "Company not found"
            });
        }

        res.status(200).json({
            success: true,
            message: "Company Deleted Successfully"
        });

    });

};

module.exports = {
    addCompany,
    getAllCompanies,
    getSingleCompany,
    editCompany,
    removeCompany
};