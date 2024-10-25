const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: String,
    description: String,
    price: Number,
    discount: Number,
    color: String,
    gender: String,
    viewCount: Number,
    sellCount: Number,
    score: Number,
    data: String,
    comments: Array,
    size: Array,
    stock: Number,
    relatedProducts: Array,
    tags: Array,
    imageUrl: Array,
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
