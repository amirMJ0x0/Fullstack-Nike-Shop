const express = require("express");
const { verifyToken } = require("../middlewares/authMiddleware");
const { createOrder, getOrders, getOrderById } = require("../controllers/orderController.js");

const router = express.Router();

router.get("/my", verifyToken, getOrders);
router.get("/:id", verifyToken, getOrderById);
router.post("/add", verifyToken, createOrder);
module.exports = router;