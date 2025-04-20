const mongoose = require("mongoose");
const Comment = require("../models/Comment");
const Product = require("../models/Product");

const getComments = async (req, res) => {
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
module.exports = { getComments, addComment }
