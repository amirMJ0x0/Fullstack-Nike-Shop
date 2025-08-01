const express = require("express");
const { createProduct, getAllProducts, getProductById, searchProducts, getProductByIds } = require("../controllers/productController");

const router = express.Router();

router.post("/", createProduct);
router.get("/", getAllProducts);
router.get("/search", searchProducts)
router.get("/:id", getProductById);

module.exports = router;
