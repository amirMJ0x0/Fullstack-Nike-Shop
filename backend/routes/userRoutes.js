const express = require("express");
const { toggleSaveProduct, getSavedProducts, getUserProfile, updateUserProfile, getUserFavorites, getUserComments } = require("../controllers/userController");
const { verifyToken } = require("../middlewares/authMiddleware"); // Middleware برای احراز هویت

const router = express.Router();

router.post("/save-product", verifyToken, toggleSaveProduct); // ذخیره یا حذف محصول
router.get("/saved-products", verifyToken, getSavedProducts); // دریافت محصولات ذخیره‌شده
router.get("/profile", verifyToken, getUserProfile);
router.get("/update-profile", verifyToken, updateUserProfile);
router.get("/favorites", verifyToken, getUserFavorites);
router.get("/comments", verifyToken, getUserComments);

module.exports = router;
