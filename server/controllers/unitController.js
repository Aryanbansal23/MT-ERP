const {
    createUnit,
    getUnits,
    getUnitById,
    updateUnit,
    deleteUnit
} = require("../models/unitModel");

// Create Unit
const addUnit = (req, res) => {
    try {

        const company_id = req.user.company_id;

        const {
            unit_name,
            short_name,
            description
        } = req.body;

        if (!unit_name || !short_name) {
            return res.status(400).json({
                success: false,
                message: "Unit Name and Short Name are required"
            });
        }

        createUnit(
            {
                company_id,
                unit_name,
                short_name,
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

                return res.status(201).json({
                    success: true,
                    message: "Unit Created Successfully",
                    unitId: result.insertId
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

// Get All Units
const getAllUnits = (req, res) => {

    getUnits(
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
                units: result
            });

        }
    );

};

// Get Unit By ID
const getSingleUnit = (req, res) => {

    const unitId = req.params.id;

    getUnitById(
        unitId,
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
                    message: "Unit not found"
                });
            }

            return res.status(200).json({
                success: true,
                unit: result[0]
            });

        }
    );

};

// Update Unit
const editUnit = (req, res) => {

    const unitId = req.params.id;

    updateUnit(
        unitId,
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
                    message: "Unit not found"
                });
            }

            return res.status(200).json({
                success: true,
                message: "Unit Updated Successfully"
            });

        }
    );

};

// Delete Unit
const removeUnit = (req, res) => {

    const unitId = req.params.id;

    deleteUnit(
        unitId,
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
                    message: "Unit not found"
                });
            }

            return res.status(200).json({
                success: true,
                message: "Unit Deleted Successfully"
            });

        }
    );

};

module.exports = {
    addUnit,
    getAllUnits,
    getSingleUnit,
    editUnit,
    removeUnit
};