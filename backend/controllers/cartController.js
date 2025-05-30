const Cart = require("../models/Cart");
const Product = require("../models/Product");

// Get cart data
const getCart = async (req, res) => {
  try {
    const userId = req.user.id;
    let cart = await Cart.findOne({ userId }).populate("items.productId");
    if (!cart) {
      cart = new Cart({ userId, items: [] });
    }
    res.status(200).json({ cart });
  } catch (error) {
    console.error("Error fetching cart:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// Add or update a product in cart
const addToCart = async (req, res) => {
  const { productId, quantity, color, size } = req.body;
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
      existingItem.quantity += 1;
    } else {
      cart.items.push({ productId, quantity, color, size });
    }
    await cart.save();
    res.status(200).json({ message: "Product added to cart", cart });
  } catch (error) {
    console.error("Error adding product to cart:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// Delete product from cart
const removeFromCart = async (req, res) => {
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
};

// Reduce quantity of a product in cart
const reduceCartItem = async (req, res) => {
  const { productId, color, size } = req.body;
  try {
    const userId = req.user.id;
    let cart = await Cart.findOne({ userId });
    if (!cart) return res.status(404).json({ message: "Cart not found" });
    const itemIndex = cart.items.findIndex(
      (item) =>
        item.productId.toString() === productId &&
        item.color === color &&
        item.size === size
    );
    if (itemIndex === -1) return res.status(404).json({ message: "Item not found in cart" });
    if (cart.items[itemIndex].quantity > 1) {
      cart.items[itemIndex].quantity -= 1;
    } else {
      cart.items.splice(itemIndex, 1);
    }
    await cart.save();
    res.status(200).json({ message: "Quantity reduced", cart });
  } catch (error) {
    console.error("Error reducing quantity:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// Merge local cart with server cart
const mergeCart = async (req, res) => {
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
    res.status(200).json({ message: "Cart updated", cart });
  } catch (error) {
    console.error("Error merging cart:", error.message);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = {
  getCart,
  addToCart,
  removeFromCart,
  reduceCartItem,
  mergeCart,
};