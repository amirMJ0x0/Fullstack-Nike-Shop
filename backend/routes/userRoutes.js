const express = require("express");
const { toggleSaveProduct, getSavedProducts, getUserProfile, updateUserProfile, getUserFavorites, getUserComments, updateUsername } = require("../controllers/userController");
const { verifyToken } = require("../middlewares/authMiddleware"); // Middleware to verify JWT token

const router = express.Router();

router.post("/save-product", verifyToken, toggleSaveProduct); // Save or Unsave product
router.get("/saved-products", verifyToken, getSavedProducts); // Get saved products
router.get("/profile", verifyToken, getUserProfile);
// router.get("/update-profile", verifyToken, updateUserProfile);
router.get("/favorites", verifyToken, getUserFavorites);
// router.get("/comments", verifyToken, getUserComments);
router.patch("/profile", verifyToken, updateUsername)
// router.patch("/email", verifyToken, updateEmail)
// router.patch("/password", verifyToken, updatePassword)

module.exports = router;
