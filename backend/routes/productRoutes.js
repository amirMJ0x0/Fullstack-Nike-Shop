const express = require("express");
const { createProduct, getAllProducts, getProductById, addComment } = require("../controllers/productController");
const { verifyToken } = require("../middlewares/authMiddleware");

const router = express.Router();

router.post("/", createProduct);
router.get("/", getAllProducts);
router.get("/:id", getProductById);
router.post("/:productId/comments", verifyToken, addComment);

module.exports = router;
