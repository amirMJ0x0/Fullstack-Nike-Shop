const express = require("express");
const router = express.Router();
const Cart = require("../models/Cart");
const Product = require("../models/Product");
const { verifyToken } = require("../middleware/authMiddleware");

// get cart data
router.get("/", verifyToken, async (req, res) => {
  try {
    const userId = req.user.id;
    const cart = await Cart.findOne({ userId }).populate("items.productId");
    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }
    res.status(200).json({ cart });
  } catch (error) {
    console.error("Error fetching cart:", error);
    res.status(500).json({ message: "Server error" });
  }
});


// add or update a product in cart
router.post("/add", verifyToken, async (req, res) => {
  const { productId, quantity } = req.body;

  try {
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    const userId = req.user.id;
    let cart = await Cart.findOne({ userId });

    if (!cart) {
      cart = new Cart({ userId, items: [] });
    }

    const existingItem = cart.items.find((item) => item.productId.toString() === productId);
    if (existingItem) {
      // اگر محصول قبلاً در کارت وجود دارد، فقط تعداد را به‌روزرسانی کنید
      existingItem.quantity += quantity;
    } else {
      // اگر محصول جدید است، آن را به کارت اضافه کنید
      cart.items.push({ productId, quantity });
    }

    await cart.save();
    res.status(200).json({ message: "Product added to cart", cart });
  } catch (error) {
    console.error("Error adding product to cart:", error);
    res.status(500).json({ message: "Server error" });
  }
});


// delete product from cart
router.delete("/remove", verifyToken, async (req, res) => {
  const { productId } = req.body;

  try {
    const userId = req.user.id;
    const cart = await Cart.findOne({ userId });

    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    cart.items = cart.items.filter((item) => item.productId.toString() !== productId);
    await cart.save();
    res.status(200).json({ message: "Product removed from cart", cart });
  } catch (error) {
    console.error("Error removing product from cart:", error);
    res.status(500).json({ message: "Server error" });
  }
});

router.post("/merge", verifyToken, async (req, res) => {
  const { items } = req.body;
  const userId = req.user.id;

  try {
    let cart = await Cart.findOne({ userId });

    if (!cart) {
      cart = new Cart({ userId, items: [] });
    }

    items.forEach((localItem) => {
      const existingItem = cart.items.find(
        (item) => item.productId.toString() === localItem.productId
      );
      if (existingItem) {
        existingItem.quantity += localItem.quantity;
      } else {
        cart.items.push(localItem);
      }
    });

    await cart.save();
    res.status(200).json({ cart });
  } catch (error) {
    console.error("Error merging cart:", error.message);
    res.status(500).json({ message: "Server error" });
  }
});


module.exports = router