const Product = require("../models/Product");


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
        const { gender, size, color, price, sale, sort, search } = req.query;

        const page = parseInt(req.query.page) || 1
        const limit = parseInt(req.query.limit) || 6
        const skip = (page - 1) * limit
        let filter = {};

        if (gender) filter.gender = { $in: gender };
        if (size) filter.size = { $in: size };
        if (color) filter.color = { $in: color };
        if (sale) filter.discount = { $gt: 0 };
        if (search) filter.name = { $regex: search.trim(), $options: 'i' };
        if (price) {

            const priceRanges = {
                "0-25": { $gte: 0, $lte: 25 },
                "25-50": { $gte: 25, $lte: 50 },
                "50-100": { $gte: 50, $lte: 100 },
                "100-150": { $gte: 100, $lte: 150 },
                "over-150": { $gte: 150 },
            };

            const priceArray = Array.isArray(price) ? price : [price];
            const priceFilters = priceArray.map((p) => priceRanges[p]).filter(Boolean);
            if (priceFilters.length > 0) {
                filter.$or = priceFilters.map((range) => ({ price: range }));
            }
        }

        let sortOptions = {};
        if (sort && sort !== "mostRelevant") {
            switch (sort) {
                case "popularity":
                    sortOptions.sellCount = -1;
                    break;
                case "lowPrice":
                    sortOptions.price = 1;
                    break;
                case "highPrice":
                    sortOptions.price = -1;
                    break;
                case "views":
                    sortOptions.viewCount = -1;
                    break;
                case "newest":
                    sortOptions.date = -1;
                    break;
                default:
                    sortOptions = {}; // No sorting applied
            }
        }




        const products = await Product.find(filter).sort(sortOptions).skip(skip).limit(limit)

        const totalProductsWithoutPagination = await Product.find(filter).sort(sortOptions).countDocuments()
        const totalProducts = await Product.find(filter).countDocuments();

        const totalPages = Math.ceil(totalProducts / limit);

        res.json({ products, totalPages, currentPage: page, totalItems: totalProductsWithoutPagination });
    } catch (err) {
        res.status(500).json({ error: "Failed to fetch products" });
    }
};



const searchProducts = async (req, res) => {
    try {
        const { query } = req.query;

        if (!query) {
            return res.status(400).json({ message: "Search query is required" });
        }

        const products = await Product.find(
            { name: { $regex: query.trim(), $options: "i" } },
            "name imageUrl _id"
        ).limit(5);
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
};


const getProductById = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id)
        if (!product) return res.status(404).json({ message: "Product Not Found" });
        res.json(product);
    } catch (error) {
        return res.status(500).json({ message: "Server Error", error });
    }
};

module.exports = { createProduct, getAllProducts, searchProducts, getProductById };

