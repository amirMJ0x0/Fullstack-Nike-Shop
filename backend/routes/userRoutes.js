const express = require("express");
const { toggleSaveProduct, getSavedProducts } = require("../controllers/userController");
const { verifyToken } = require("../middlewares/authMiddleware"); // Middleware برای احراز هویت

const router = express.Router();

router.post("/save-product", verifyToken, toggleSaveProduct); // ذخیره یا حذف محصول
router.get("/saved-products", verifyToken, getSavedProducts); // دریافت محصولات ذخیره‌شده

module.exports = router;
