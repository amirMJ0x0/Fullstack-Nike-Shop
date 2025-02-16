const Product = require("../models/Product");

// Add Comment to product
const addComment = async (req, res) => {
    try {
        const { productId } = req.params;
        const { text, rating } = req.body;
        const userId = req.user.id;

        if (!text || !rating) {
            return res.status(400).json({ message: "Text and Rating are Required!" });
        }

        const product = await Product.findById(productId);
        if (!product) {
            return res.status(404).json({ message: "Product was not found!" });
        }

        //create new comment
        const newComment = {
            userId,
            text,
            rating,
            date: new Date(),
        };

        // adding to comments array
        product.comments.push(newComment);

        // updating total rating and average rating
        const totalRatings = product.comments.reduce((sum, c) => sum + c.rating, 0);
        product.averageRating = totalRatings / product.comments.length;
        product.commentsCount = product.comments.length;

        await product.save();

        res.status(201).json({ message: "The comment successfully saved", comment: newComment });
    } catch (error) {
        res.status(500).json({ message: "Something went wrong!", error: error.message });
    }
};

const createProduct = async (req, res) => {
    const { name, price, description, imageUrl } = req.body;
    try {
        const newProduct = new Product({ name, price, description, imageUrl });
        await newProduct.save();
        res.status(201).send(newProduct);
    } catch (error) {
        res.status(400).send(error);
    }
};

const getAllProducts = async (req, res) => {
    try {
        const products = await Product.find();
        res.json(products);
    } catch (err) {
        res.status(500).json({ error: "Failed to fetch products" });
    }
};

const getProductById = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id).populate("comments.userId", "username");
        if (!product) return res.status(404).json({ message: "Product Not Found" });
        res.json(product);
    } catch (error) {
        return res.status(500).json({ message: "Server Error", error });
    }
};

module.exports = { createProduct, getAllProducts, getProductById, addComment };

