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
// const updateUserProfile = async (req, res) => {
//     try {
//         const userId = req.user.id;
//         const { name, email, password } = req.body;

//         let user = await User.findById(userId);
//         if (!user) {
//             return res.status(404).json({ error: "User not found" });
//         }

//         // آپدیت اطلاعات
//         if (name) user.name = name;
//         if (email) user.email = email;
//         if (password) {
//             const salt = await bcrypt.genSalt(10);
//             user.password = await bcrypt.hash(password, salt);
//         }

//         await user.save();
//         res.json({ message: "Profile updated successfully" });

//     } catch (err) {
//         res.status(500).json({ error: "Failed to update profile" });
//     }
// };
const getUserFavorites = async (req, res) => {
    try {
        const userId = req.user.id;
        const user = await User.findById(userId).populate("favorites");
        res.json(user.favorites);
    } catch (err) {
        res.status(500).json({ error: "Failed to fetch favorites" });
    }
};
const updateUsername = async (req, res) => {
    try {
        const userId = req.user.id;
        const { username } = req.body;
        if (!username) return res.status(400).json({ message: "Username is required." });

        // Check if username is taken
        const exists = await User.findOne({ username });
        if (exists) return res.status(409).json({ message: "Username already taken." });

        const user = await User.findById(userId);
        if (!user) return res.status(404).json({ message: "User not found." });

        user.username = username;
        await user.save();

        res.json({ message: "Username updated successfully." });
    } catch (err) {
        res.status(500).json({ message: "Failed to update username." });
    }
};
module.exports = { toggleSaveProduct, getSavedProducts, getUserProfile, updateUsername, getUserFavorites };