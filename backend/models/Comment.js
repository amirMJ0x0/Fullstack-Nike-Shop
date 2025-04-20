const mongoose = require('mongoose');
const commentSchema = new mongoose.Schema(
    {
        userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
        productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product", required: true },
        text: { type: String, required: true },
        rating: { type: Number, required: true },
        date: { type: Date, default: Date.now },
    },
    { timestamps: true }
);

const Comment = mongoose.model("Comment", commentSchema);

module.exports = Comment