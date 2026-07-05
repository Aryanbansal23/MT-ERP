const express = require("express");
const router = express.Router();

const verifyToken = require("../middleware/authMiddleware");

const {
    addUnit,
    getAllUnits,
    getSingleUnit,
    editUnit,
    removeUnit
} = require("../controllers/unitController");

// Create Unit
router.post("/create", verifyToken, addUnit);

// Get All Units
router.get("/", verifyToken, getAllUnits);

// Get Unit By ID
router.get("/:id", verifyToken, getSingleUnit);

// Update Unit
router.put("/:id", verifyToken, editUnit);

// Delete Unit
router.delete("/:id", verifyToken, removeUnit);

module.exports = router;