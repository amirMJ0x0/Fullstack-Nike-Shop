const express = require("express");
const { getCommentsByProductId, getCommentsByUserId, addComment, removeComment, editComment } = require("../controllers/commentController");
const { verifyToken } = require("../middlewares/authMiddleware");

const router = express.Router();
router.get("/my", verifyToken, getCommentsByUserId);
router.get("/:productId", getCommentsByProductId);
router.post("/add/:productId", verifyToken, addComment);
router.delete("/remove/:commentId", verifyToken, removeComment);
router.patch("/edit/:commentId", verifyToken, editComment);

module.exports = router;
