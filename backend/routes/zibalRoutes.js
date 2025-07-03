// backend/routes/zibalRoutes.js
const express = require("express");
const { verifyToken } = require("../middlewares/authMiddleware");

const { createZibalRequest, verifyPayment } = require("../controllers/zibalPayController");

const router = express.Router();

// Request payment from Zibal
router.post("/request", verifyToken, createZibalRequest)

// Verify payment from Zibal
router.post("/verify", verifyPayment)


module.exports = router;
