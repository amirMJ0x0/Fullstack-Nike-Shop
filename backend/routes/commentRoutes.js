const express = require("express");
const { getComments, addComment } = require("../controllers/commentController");
const { verifyToken } = require("../middlewares/authMiddleware");

const router = express.Router();
router.get("/:productId", getComments);
router.post("/add/:productId", verifyToken, addComment);

module.exports = router;
