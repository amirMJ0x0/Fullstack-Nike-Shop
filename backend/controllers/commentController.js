const mongoose = require("mongoose");
const Comment = require("../models/Comment");
const Product = require("../models/Product");

const getCommentsByProductId = async (req, res) => {
    const { productId } = req.params;

    try {
        const comments = await Comment.aggregate([
            { $match: { productId: new mongoose.Types.ObjectId(productId) } },
            {
                $lookup: {
                    from: "users",
                    localField: "userId",
                    foreignField: "_id",
                    as: "user"
                }
            },
            { $unwind: "$user" },
            { $sort: { date: -1 } }, // sort by date descending
            {
                $project: {
                    text: 1,
                    rating: 1,
                    date: 1,
                    "user.username": 1,
                    "user._id": 1
                }
            }
        ]);

        res.json(comments);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Error getting comments" });
    }
}

const getCommentsByUserId = async (req, res) => {
    const userId = req.user.id

    try {
        const comments = await Comment.find({ userId })
            .populate('productId', 'name imageUrl')
            .sort({ date: -1 });


        res.status(200).json(comments);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Error getting comments by user" });
    }
};
// Add Comment to product
const addComment = async (req, res) => {
    try {
        const { text, rating } = req.body;
        const { productId } = req.params
        const userId = req.user.id
        if (!mongoose.Types.ObjectId.isValid(productId)) {
            return res.status(400).json({ error: 'Invalid productId' });
        }

        if (!text || !rating) {
            return res.status(400).json({ message: "Text and Rating are Required!" });
        }

        //create new comment
        const newComment = await Comment.create({
            userId: userId,
            productId,
            text,
            rating,
            date: new Date(),
        });


        // updating total rating and average rating
        const comments = await Comment.find({ productId })
        const commentsCount = comments.length
        const averageRating = comments.reduce((acc, c) => acc + c.rating, 0) / commentsCount;

        // update product
        await Product.findByIdAndUpdate(productId, { averageRating, commentsCount })

        res.status(201).json({
            message: "Comment created", averageRating,
            commentsCount: commentsCount, comment: newComment
        });
    } catch (error) {
        res.status(500).json({ message: "Internal server error!", error: error.message });
    }
};
const removeComment = async (req, res) => {
    try {
        const { commentId } = req.params;

        // Check if the comment exists
        const comment = await Comment.findById(commentId);
        const productId = comment.productId
        if (!comment) {
            return res.status(404).json({ message: "Comment not found" });
        }


        // Delete the comment
        await comment.deleteOne();

        // updating total rating and average rating
        const productComments = await Comment.find({ productId })
        const commentsCount = productComments.length
        const averageRating = commentsCount > 0
            ? productComments.reduce((acc, c) => acc + c.rating, 0) / commentsCount
            : 0;

        // update product
        await Product.findByIdAndUpdate(comment.productId, { averageRating, commentsCount })
        res.status(200).json({ message: "Comment deleted successfully", averageRating, commentsCount });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error", error: error.message });
    }
}

const editComment = async (req, res) => {
    try {
        const { commentId } = req.params;
        const { text, rating } = req.body;

        // Check if the comment exists
        const comment = await Comment.findById(commentId);
        if (!comment) {
            return res.status(404).json({ message: "Comment not found" });
        }


        // Update the comment
        comment.text = text || comment.text;
        comment.rating = rating ?? comment.rating;
        await comment.save();

        const productComments = await Comment.find({ productId: comment.productId });
        const commentsCount = productComments.length;
        const averageRating =
            productComments.reduce((acc, c) => acc + c.rating, 0) / commentsCount;

        await Product.findByIdAndUpdate(comment.productId, {
            commentsCount,
            averageRating,
        });

        res.status(200).json({ message: "Comment updated successfully", commentsCount, averageRating });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error", error: error.message });
    }
}
module.exports = { getCommentsByProductId, getCommentsByUserId, addComment, removeComment, editComment }
