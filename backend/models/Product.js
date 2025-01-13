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
    data: String,
    comments: [
        {
            userId: String,
            text: String,
            rating: Number,
        },
    ],
    size: Array,
    stock: Number,
    relatedProducts: Array,
    tags: Array,
    imageUrl: [String],
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
