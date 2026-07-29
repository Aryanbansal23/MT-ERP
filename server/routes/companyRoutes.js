const express = require("express");
const router = express.Router();

const verifyToken = require("../middleware/verifyToken");

const {
    addCompany,
    getAllCompanies,
    getSingleCompany,
    editCompany,
    removeCompany
} = require("../controllers/companyController");

// Create Company
router.post("/create", verifyToken, addCompany);

// Get All Companies
router.get("/", verifyToken, getAllCompanies);

// Get Company By ID
router.get("/:id", verifyToken, getSingleCompany);

// Update Company
router.put("/:id", verifyToken, editCompany);

// Delete Company
router.delete("/:id", verifyToken, removeCompany);

module.exports = router;