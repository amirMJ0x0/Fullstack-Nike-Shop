const express = require("express");
const { verifyToken } = require("../middlewares/authMiddleware");
const {
  getCart,
  addToCart,
  removeFromCart,
  reduceCartItem,
  mergeCart,
} = require("../controllers/cartController");

const router = express.Router();

router.get("/", getCart);
router.post("/add", addToCart);
router.delete("/remove", verifyToken, removeFromCart);
router.post("/reduce", verifyToken, reduceCartItem);
router.post("/merge", verifyToken, mergeCart);

module.exports = router;