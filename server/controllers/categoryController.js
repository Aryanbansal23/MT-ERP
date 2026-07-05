const {
    createCategory,
    getCategories,
    getCategoryById,
    updateCategory,
    deleteCategory
} = require("../models/categoryModel");

// Create Category
const addCategory = (req, res) => {
    try {
        const {
            company_id,
            category_name,
            description
        } = req.body;

        if (!company_id || !category_name) {
            return res.status(400).json({
                success: false,
                message: "Company ID and Category Name are required"
            });
        }

        createCategory(
            {
                company_id,
                category_name,
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
                    message: "Category Created Successfully",
                    categoryId: result.insertId
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

// Get All Categories
const getAllCategories = (req, res) => {

    getCategories(req.user.id, (err, result) => {

        if (err) {
            return res.status(500).json({
                success: false,
                message: err.message
            });
        }

        res.status(200).json({
            success: true,
            count: result.length,
            categories: result
        });

    });

};

// Get Category By ID
const getSingleCategory = (req, res) => {

    const categoryId = req.params.id;

    getCategoryById(categoryId, req.user.id, (err, result) => {

        if (err) {
            return res.status(500).json({
                success: false,
                message: err.message
            });
        }

        if (result.length === 0) {
            return res.status(404).json({
                success: false,
                message: "Category not found"
            });
        }

        res.status(200).json({
            success: true,
            category: result[0]
        });

    });

};

// Update Category
const editCategory = (req, res) => {

    const categoryId = req.params.id;

    updateCategory(categoryId, req.user.id, req.body, (err, result) => {

        if (err) {
            return res.status(500).json({
                success: false,
                message: err.message
            });
        }

        if (result.affectedRows === 0) {
            return res.status(404).json({
                success: false,
                message: "Category not found"
            });
        }

        res.status(200).json({
            success: true,
            message: "Category Updated Successfully"
        });

    });

};

// Delete Category
const removeCategory = (req, res) => {

    const categoryId = req.params.id;

    deleteCategory(categoryId, req.user.id, (err, result) => {

        if (err) {
            return res.status(500).json({
                success: false,
                message: err.message
            });
        }

        if (result.affectedRows === 0) {
            return res.status(404).json({
                success: false,
                message: "Category not found"
            });
        }

        res.status(200).json({
            success: true,
            message: "Category Deleted Successfully"
        });

    });

};

module.exports = {
    addCategory,
    getAllCategories,
    getSingleCategory,
    editCategory,
    removeCategory
};