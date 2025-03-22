const User = require("../models/User");
const Product = require("../models/Product");

const toggleSaveProduct = async (req, res) => {
    try {
        const userId = req.user.id; // شناسه کاربر از توکن استخراج شده
        const { productId } = req.body; // شناسه محصول از body دریافت شده

        // چک کن که محصول در لیست ذخیره‌های کاربر هست یا نه
        const user = await User.findById(userId);
        if (!user) return res.status(404).json({ message: "User not found" });

        const isAlreadySaved = user.savedProducts.includes(productId);

        if (isAlreadySaved) {
            // حذف محصول از لیست ذخیره‌شده‌ها
            user.savedProducts = user.savedProducts.filter(id => id.toString() !== productId);
            await user.save();
            return res.json({ message: "Product removed from saved list" });
        } else {
            // افزودن محصول به لیست ذخیره‌شده‌ها
            user.savedProducts.push(productId);
            await user.save();
            return res.json({ message: "Product added to saved list" });
        }
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
};

const getSavedProducts = async (req, res) => {
    try {
        const userId = req.user.id;
        const user = await User.findById(userId).populate("savedProducts");

        if (!user) return res.status(404).json({ message: "User not found" });

        res.json({ savedProducts: user.savedProducts });
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
};

module.exports = { toggleSaveProduct, getSavedProducts };