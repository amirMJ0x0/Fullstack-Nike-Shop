const mongoose = require('mongoose');

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
    averageRating: { type: Number, default: 0 },
    commentsCount: { type: Number, default: 0 },
});


const Product = mongoose.model('Product', productSchema);

module.exports = Product;
