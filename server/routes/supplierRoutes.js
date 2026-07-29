const express = require("express");
const router = express.Router();

const verifyToken = require("../middleware/verifyToken");

const {
    addSupplier,
    getAllSuppliers,
    getSingleSupplier,
    editSupplier,
    removeSupplier
} = require("../controllers/supplierController");

router.post("/create", verifyToken, addSupplier);
router.get("/", verifyToken, getAllSuppliers);
router.get("/:id", verifyToken, getSingleSupplier);
router.put("/:id", verifyToken, editSupplier);
router.delete("/:id", verifyToken, removeSupplier);

module.exports = router;