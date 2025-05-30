const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const Otp = require("../models/Otp");
const { generateTokens } = require("../utils/generateTokens");
const { generateOtp } = require("../utils/generateOtp");
const { sendVerificationEmail } = require("../utils/email");
const { finalizeAuth } = require("../utils/finalizeAuth");

const secretKey = process.env.JWT_SECRET;
const refreshSecretKey = process.env.REFRESH_TOKEN_SECRET;

// Register
const register = async (req, res) => {
    try {
        const { username, email, password } = req.body;
        const existingUser = await User.findOne({ $or: [{ email }, { username }] });
        if (existingUser) {
            return res.status(400).json({ message: 'Username or email already in use' });
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({ username, email, password: hashedPassword });
        await newUser.save();

        const otp = generateOtp();
        const expiresAt = new Date(Date.now() + 5 * 60 * 1000);
        await Otp.create({
            email,
            otp,
            purpose: 'email-verification',
            expiresAt
        });
        await sendVerificationEmail(email, otp);

        return res.status(201).json({
            success: true,
            message: "Registration successful. Please verify your email to continue.",
            data: {
                userId: newUser._id,
                email,
                expiresAt
            }
        });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

// Login
const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }
        if (!user.isVerified) {
            const otp = generateOtp();
            const expiresAt = new Date(Date.now() + 5 * 60 * 1000);

            await Otp.deleteMany({ email, purpose: 'email-verification' });
            await Otp.create({
                email,
                otp,
                purpose: 'email-verification',
                expiresAt,
            });

            await sendVerificationEmail(email, otp);

            return res.status(403).json({ message: 'Please verify your email before logging in.', expiresAt });
        }

        finalizeAuth(res, user);
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

// Verify Email
const verifyEmail = async (req, res) => {
    const { email, otpToken } = req.body;
    try {
        const purpose = "email-verification";
        const otpRecord = await Otp.findOne({ email, otp: otpToken, purpose });

        if (!otpRecord) return res.status(400).json({ message: "Invalid OTP or purpose" });
        if (otpRecord?.otp !== otpToken) {
            return res.status(400).json("Invalid OTP");
        }
        if (otpRecord?.expiresAt < Date.now()) {
            return res.status(410).json('OTP has expired.');
        }

        await Otp.deleteMany({ email, purpose });

        const user = await User.findOne({ email });
        if (!user) return res.status(404).json({ message: 'User not found.' });

        user.isVerified = true;
        await user.save();

        await finalizeAuth(res, user);
        return;
    } catch (error) {
        console.error('Verify email error:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

// Resend Verification
const resendVerification = async (req, res) => {
    const { email } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) return res.status(404).json({ message: 'User not found.' });
        if (user.isVerified) return res.status(400).json({ message: 'Already verified.' });

        await Otp.deleteMany({ email, purpose: 'email-verification' });

        const otp = generateOtp();
        const expiresAt = Date.now() + 5 * 60 * 1000;
        await Otp.create({
            email,
            otp,
            purpose: 'email-verification',
            expiresAt
        });
        await sendVerificationEmail(email, otp);

        res.status(200).json({ message: 'OTP resent. Check your inbox.', expiresAt });
    } catch (error) {
        console.error('Resend verification error:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

// Update Email
const updateEmail = async (req, res) => {
    const { oldEmail, newEmail } = req.body;
    try {
        const user = await User.findOne({ email: oldEmail, isVerified: false });
        if (!user) {
            return res.status(404).json({ message: "Unverified user not found." });
        }
        const emailExists = await User.findOne({ email: newEmail });
        if (emailExists) {
            return res.status(409).json({ message: "This email is already in use." });
        }
        user.email = newEmail;
        await user.save();

        await Otp.deleteMany({ email: oldEmail, purpose: "email-verification" });

        const otp = generateOtp();
        const expiresAt = new Date(Date.now() + 5 * 60 * 1000);
        await Otp.create({
            email: newEmail,
            otp,
            purpose: "email-verification",
            expiresAt,
        });

        await sendVerificationEmail(newEmail, otp);

        res.status(200).json({ message: "Email updated and verification sent." });
    } catch (error) {
        console.error("Update email error:", error);
        res.status(500).json({ message: "Server error" });
    }
};

// Refresh Token
const refresh = async (req, res) => {
    try {
        const { refreshToken } = req.cookies;
        if (!refreshToken) {
            return res.status(401).json({ message: 'No refresh token provided' });
        }

        const decoded = jwt.verify(refreshToken, refreshSecretKey);
        const user = await User.findById(decoded.id);

        if (!user || user.refreshToken !== refreshToken) {
            return res.status(401).json({ message: 'Invalid refresh token' });
        }

        const { accessToken, refreshToken: newRefreshToken } = generateTokens(user._id);

        user.refreshToken = newRefreshToken;
        await user.save();

        res.cookie('accessToken', accessToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: process.env.NODE_ENV === "production" ? "strict" : "lax",
            maxAge: 15 * 60 * 1000,
        });

        res.cookie('refreshToken', newRefreshToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: process.env.NODE_ENV === "production" ? "strict" : "lax",
            maxAge: 7 * 24 * 60 * 60 * 1000,
        });

        res.json({ message: 'Tokens refreshed successfully' });
    } catch (error) {
        if (error.name === 'JsonWebTokenError') {
            return res.status(401).json({ message: 'Invalid refresh token' });
        }
        res.status(500).json({ message: 'Server error' });
    }
};

// User Info
const userInfo = async (req, res) => {
    try {
        const { accessToken } = req.cookies;
        if (!accessToken) {
            return res.json({ message: 'Unauthorized', statusCode: 401 });
        }
        const decoded = jwt.verify(accessToken, secretKey);
        const user = await User.findById(decoded.id).select("-password");
        if (!user) return res.status(404).json({ message: "User not found" });
        res.json({ data: user, userStatus: "Authorized" });
    } catch (err) {
        if (err.name === 'JsonWebTokenError') {
            return res.status(401).json({ message: 'Invalid token' });
        }
        res.status(500).json({ error: "Failed to fetch user" });
    }
};

// Logout
const logout = async (req, res) => {
    try {
        const { refreshToken } = req.cookies;
        if (refreshToken) {
            const decoded = jwt.verify(refreshToken, refreshSecretKey);
            const user = await User.findById(decoded.id);
            if (user) {
                user.refreshToken = null;
                await user.save();
            }
        }

        res.clearCookie('accessToken', { httpOnly: true, secure: process.env.NODE_ENV === 'production' });
        res.clearCookie('refreshToken', { httpOnly: true, secure: process.env.NODE_ENV === 'production' });
        res.status(200).json({ message: 'Logged out successfully', statusCode: 200 });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

module.exports = { register, login, verifyEmail, resendVerification, updateEmail, refresh, logout, userInfo }