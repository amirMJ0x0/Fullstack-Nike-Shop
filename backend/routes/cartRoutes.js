const express = require("express");
const { verifyToken } = require("../middlewares/authMiddleware");
const {
  getCart,
  addToCart,
  removeFromCart,
  reduceCartItem,
  mergeCart,
  clearCart
} = require("../controllers/cartController");

const router = express.Router();

router.get("/", verifyToken, getCart);
router.post("/add", verifyToken, addToCart);
router.delete("/remove", verifyToken, removeFromCart);
router.post("/reduce", verifyToken, reduceCartItem);
router.post("/merge", verifyToken, mergeCart);
router.delete("/", verifyToken, clearCart);

module.exports = router;