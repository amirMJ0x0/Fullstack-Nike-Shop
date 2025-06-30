const User = require("../models/User");
const Comment = require("../models/Comment");
const Product = require("../models/Product");
const Otp = require("../models/Otp");
const bcrypt = require("bcryptjs");
const { sendEmailChangeVerification } = require("../utils/email");
const { generateOtp } = require("../utils/generateOtp");

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

// Update Email Controller
const updateEmail = async (req, res) => {
    try {
        const userId = req.user.id;
        const { email } = req.body;
        if (!email) return res.status(400).json({ message: "Email is required." });

        // Check if email is taken
        const exists = await User.findOne({ email });
        if (exists) return res.status(409).json({ message: "Email already taken." });

        const user = await User.findById(userId);
        if (!user) return res.status(404).json({ message: "User not found." });

        user.email = email;
        user.isVerified = false;
        await user.save();

        res.json({ message: "Email updated successfully." });
    } catch (err) {
        res.status(500).json({ message: "Failed to update email." });
    }
};

// Change Password Controller
const changePassword = async (req, res) => {
    try {
        const userId = req.user.id;
        const { oldPassword, newPassword } = req.body;
        if (!oldPassword || !newPassword) {
            return res.status(400).json({ message: "Old and new passwords are required." });
        }

        const user = await User.findById(userId);
        if (!user) return res.status(404).json({ message: "User not found." });

        // Check old password
        const isMatch = await bcrypt.compare(oldPassword, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: "Old password is incorrect." });
        }

        // Hash new password
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(newPassword, salt);
        await user.save();

        res.json({ message: "Password changed successfully." });
    } catch (err) {
        res.status(500).json({ message: "Failed to change password." });
    }
};

// Initiate Email Change (Step 1: Send verification to current email)
const initiateEmailChange = async (req, res) => {
    try {
        const userId = req.user.id;
        const { newEmail, currentPassword } = req.body;

        if (!newEmail || !currentPassword) {
            return res.status(400).json({ message: "New email and current password are required." });
        }

        // Validate new email format
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(newEmail)) {
            return res.status(400).json({ message: "Invalid email format." });
        }

        // Check if new email is already taken
        const emailExists = await User.findOne({ email: newEmail });
        if (emailExists) {
            return res.status(409).json({ message: "Email already taken." });
        }

        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: "User not found." });
        }

        // Verify current password
        const isPasswordValid = await bcrypt.compare(currentPassword, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: "Current password is incorrect." });
        }

        // Generate verification code
        const verificationCode = generateOtp();
        const expiryTime = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes

        // Save OTP to database with newEmail
        await Otp.create({
            email: user.email, // Send to current email
            otp: verificationCode,
            purpose: 'email-change',
            newEmail: newEmail, // Store the new email
            expiresAt: expiryTime
        });

        // Send verification email to current email
        await sendEmailChangeVerification(user.email, verificationCode);

        res.json({
            message: "Verification code sent to your current email address.",
            email: user.email // Return current email for UI display
        });
    } catch (err) {
        res.status(500).json({ message: "Failed to initiate email change." });
    }
};

// Verify Email Change Code (Step 2: Verify the code)
const verifyEmailChange = async (req, res) => {
    try {
        const userId = req.user.id;
        const { verificationCode } = req.body;

        if (!verificationCode) {
            return res.status(400).json({ message: "Verification code is required." });
        }

        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: "User not found." });
        }

        // Find the OTP record
        const otpRecord = await Otp.findOne({
            email: user.email,
            otp: verificationCode,
            purpose: 'email-change',
            expiresAt: { $gt: new Date() }
        });

        if (!otpRecord) {
            return res.status(400).json({ message: "Invalid or expired verification code." });
        }

        // Check if new email is still available
        const emailExists = await User.findOne({ email: otpRecord.newEmail });
        if (emailExists) {
            return res.status(409).json({ message: "Email already taken." });
        }

        // Update email
        user.email = otpRecord.newEmail;
        user.isVerified = false; // New email needs verification
        await user.save();

        // Delete the used OTP
        await Otp.findByIdAndDelete(otpRecord._id);

        res.json({
            message: "Email changed successfully. Please verify your new email address.",
            newEmail: user.email
        });
    } catch (err) {
        res.status(500).json({ message: "Failed to verify email change." });
    }
};

// Update user profile (fullName, phone, address, city, postalCode, country)
const updateUserProfile = async (req, res) => {
    try {
        const userId = req.user.id;
        const updateFields = {};
        const allowedFields = ["fullName", "phone", "address", "city", "postalCode", "country"];
        allowedFields.forEach(field => {
            if (req.body[field] !== undefined) {
                updateFields[field] = req.body[field];
            }
        });
        if (Object.keys(updateFields).length === 0) {
            return res.status(400).json({ message: "No valid fields to update." });
        }
        const user = await User.findByIdAndUpdate(userId, updateFields, { new: true }).select("-password");
        res.json({ message: "Profile updated successfully.", user });
    } catch (err) {
        res.status(500).json({ message: "Failed to update profile." });
    }
};

module.exports = { toggleSaveProduct, getSavedProducts, getUserProfile, updateUsername, getUserFavorites, updateEmail, changePassword, initiateEmailChange, verifyEmailChange, updateUserProfile };