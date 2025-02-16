const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    text: { type: String, required: true },
    rating: { type: Number, required: true, min: 1, max: 5 },
    date: { type: Date, default: Date.now },
});

const productSchema = new mongoose.Schema({
    name: String,
    description: String,
    price: Number,
    discount: Number,
    color: Array,
    gender: String,
    viewCount: Number,
    sellCount: Number,
    score: Number,
    date: Date,
    size: Array,
    stock: Number,
    relatedProducts: Array,
    tags: Array,
    imageUrl: [String],
    comments: [commentSchema],
    averageRating: { type: Number, default: 0 },
    commentsCount: { type: Number, default: 0 },
});


const Product = mongoose.model('Product', productSchema);

module.exports = Product;
