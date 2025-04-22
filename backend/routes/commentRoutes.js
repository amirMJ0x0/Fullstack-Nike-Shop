const express = require("express");
const { getCommentsByProductId, getCommentsByUserId, addComment, removeComment } = require("../controllers/commentController");
const { verifyToken } = require("../middlewares/authMiddleware");

const router = express.Router();
router.get("/my", verifyToken, getCommentsByUserId);
router.get("/:productId", getCommentsByProductId);
router.post("/add/:productId", verifyToken, addComment);
router.delete("/remove/:commentId", verifyToken, removeComment);
// router.patch("/edit/:productId", verifyToken, editComment);

module.exports = router;
