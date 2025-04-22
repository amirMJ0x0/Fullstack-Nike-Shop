const express = require("express");
const { toggleSaveProduct, getSavedProducts, getUserProfile, updateUserProfile, getUserFavorites, getUserComments } = require("../controllers/userController");
const { verifyToken } = require("../middlewares/authMiddleware"); // Middleware to verify JWT token

const router = express.Router();

router.post("/save-product", verifyToken, toggleSaveProduct); // Save or Unsave product
router.get("/saved-products", verifyToken, getSavedProducts); // Get saved products
router.get("/profile", verifyToken, getUserProfile);
router.get("/update-profile", verifyToken, updateUserProfile);
router.get("/favorites", verifyToken, getUserFavorites);
// router.get("/comments", verifyToken, getUserComments);

module.exports = router;
