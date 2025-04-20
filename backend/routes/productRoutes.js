const express = require("express");
const { createProduct, getAllProducts, getProductById, searchProducts } = require("../controllers/productController");
const { verifyToken } = require("../middlewares/authMiddleware");

const router = express.Router();

router.post("/", createProduct);
router.get("/", getAllProducts);
router.get("/search", searchProducts)
router.get("/:id", getProductById);

module.exports = router;
