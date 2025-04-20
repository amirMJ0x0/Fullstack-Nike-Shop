const User = require("../models/User");
const Comment = require("../models/Comment");
const Product = require("../models/Product");

const toggleSaveProduct = async (req, res) => {
    try {
        const userId = req.user.id; // شناسه کاربر از توکن استخراج شده
        const { productId } = req.body; // شناسه محصول از body دریافت شده

        // چک کن که محصول در لیست ذخیره‌های کاربر هست یا نه
        const user = await User.findById(userId);
        if (!user) return res.status(404).json({ message: "User not found" });

        const isAlreadySaved = user.favorites.includes(productId);

        if (isAlreadySaved) {
            // حذف محصول از لیست ذخیره‌شده‌ها
            user.favorites = user.favorites.filter(id => id.toString() !== productId);
            await user.save();
            return res.json({ message: "Product removed from saved list" });
        } else {
            // افزودن محصول به لیست ذخیره‌شده‌ها
            user.favorites.push(productId);
            await user.save();
            return res.json({ message: "Product added to saved list" });
        }
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

const getSavedProducts = async (req, res) => {
    try {
        const userId = req.user.id;
        const user = await User.findById(userId).populate("favorites");

        if (!user) return res.status(404).json({ message: "User not found" });

        res.json({ favorites: user.favorites });
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
};

const getUserProfile = async (req, res) => {
    try {
        const userId = req.user.id; // اینو از توکن JWT بگیر
        const user = await User.findById(userId).select("-password"); // پسورد رو حذف می‌کنیم
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }
        res.json(user);
    } catch (err) {
        res.status(500).json({ error: "Failed to fetch user profile" });
    }
};
const updateUserProfile = async (req, res) => {
    try {
        const userId = req.user.id;
        const { name, email, password } = req.body;

        let user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        // آپدیت اطلاعات
        if (name) user.name = name;
        if (email) user.email = email;
        if (password) {
            const salt = await bcrypt.genSalt(10);
            user.password = await bcrypt.hash(password, salt);
        }

        await user.save();
        res.json({ message: "Profile updated successfully" });

    } catch (err) {
        res.status(500).json({ error: "Failed to update profile" });
    }
};
const getUserFavorites = async (req, res) => {
    try {
        const userId = req.user.id;
        const user = await User.findById(userId).populate("favorites");
        res.json(user.favorites);
    } catch (err) {
        res.status(500).json({ error: "Failed to fetch favorites" });
    }
};
// const getUserComments = async (req, res) => {
//     try {
//         const userId = req.user.id;
//         const comments = await Comment.findById(userId).populate("product", "name imageUrl");
//         res.json(comments);
//     } catch (err) {
//         res.status(500).json({ error: "Failed to fetch comments" });
//     }
// };
// controllers/userController.js

const getUserComments = async (req, res) => {
    try {
        const userId = req.user.id;

        //finding all products that have comments from the user
        const products = await Product.find(
            { "comments.userId": userId },
            { name: 1, imageUrl: 1, comments: 1 }
        );

        const userComments = [];

        products.forEach(product => {
            product.comments.forEach(comment => {
                if (comment.userId.toString() === userId.toString()) {
                    userComments.push({
                        productId: product._id,
                        productName: product.name,
                        productImage: product.imageUrl[0],
                        text: comment.text,
                        rating: comment.rating,
                        date: comment.date
                    });
                }
            });
        });
        
        userComments.sort((a, b) => new Date(b.date) - new Date(a.date));

        res.json(userComments);

    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Error getting user's comments" });
    }
};

module.exports = { toggleSaveProduct, getSavedProducts, getUserProfile, updateUserProfile, getUserFavorites, getUserComments };