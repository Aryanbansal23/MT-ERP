const express = require("express");
const router = express.Router();

const verifyToken = require("../middleware/authMiddleware");

const {
    addCategory,
    getAllCategories,
    getSingleCategory,
    editCategory,
    removeCategory
} = require("../controllers/categoryController");

// Create Category
router.post("/create", verifyToken, addCategory);

// Get All Categories
router.get("/", verifyToken, getAllCategories);

// Get Category By ID
router.get("/:id", verifyToken, getSingleCategory);

// Update Category
router.put("/:id", verifyToken, editCategory);

// Delete Category
router.delete("/:id", verifyToken, removeCategory);

module.exports = router;