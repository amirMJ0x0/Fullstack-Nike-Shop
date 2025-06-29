const express = require("express");
const {
    toggleSaveProduct,
    getSavedProducts,
    getUserProfile,
    updateUserProfile,
    getUserFavorites,
    getUserComments,
    updateUsername,
    initiateEmailChange,
    verifyEmailChange,
    changePassword
} = require("../controllers/userController");
const { verifyToken } = require("../middlewares/authMiddleware"); // Middleware to verify JWT token

const router = express.Router();

router.post("/save-product", verifyToken, toggleSaveProduct); // Save or Unsave product
router.get("/saved-products", verifyToken, getSavedProducts); // Get saved products
router.get("/profile", verifyToken, getUserProfile);
// router.get("/update-profile", verifyToken, updateUserProfile);
router.get("/favorites", verifyToken, getUserFavorites);
// router.get("/comments", verifyToken, getUserComments);
router.patch("/username", verifyToken, updateUsername);
router.post("/initiate-email-change", verifyToken, initiateEmailChange);
router.post("/verify-email-change", verifyToken, verifyEmailChange);
router.patch("/password", verifyToken, changePassword);

module.exports = router;
