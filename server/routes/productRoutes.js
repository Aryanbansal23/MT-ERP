const express = require("express");
const router = express.Router();

const verifyToken = require("../middleware/authMiddleware");

const {
    addProduct,
    getAllProducts,
    getSingleProduct,
    editProduct,
    removeProduct
} = require("../controllers/productController");

// Create Product
router.post("/create", verifyToken, addProduct);

// Get All Products
router.get("/", verifyToken, getAllProducts);

// Get Product By ID
router.get("/:id", verifyToken, getSingleProduct);

// Update Product
router.put("/:id", verifyToken, editProduct);

// Delete Product
router.delete("/:id", verifyToken, removeProduct);

module.exports = router;