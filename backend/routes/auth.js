const dotenv = require("dotenv");
dotenv.config();
const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const router = express.Router();

const secretKey = process.env.JWT_SECRET
if (!secretKey) {
    console.error('⚠️ JWT_SECRET is not set in environment variables!');
    process.exit(1);
}


// * register route
router.post('/register', async (req, res) => {
    try {
        const { username, email, password } = req.body;

        // check if the username or email is signed in before
        const existingUser = await User.findOne({ $or: [{ email }, { username }] });
        if (existingUser) {
            return res.status(400).json({ message: 'Username or email already in use' });
        }

        // hashing password
        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new User({ username, email, password: hashedPassword });
        await newUser.save();

        // Automatically log in the user after registration
        const token = jwt.sign({ id: newUser._id }, secretKey, { expiresIn: '1d' });

        res.cookie('token', token, {
            httpOnly: true, // Server-side access only
            secure: process.env.NODE_ENV === 'production', // HTTPS only in production
            sameSite: process.env.NODE_ENV === "production" ? "strict" : "lax",
            maxAge: 24 * 60 * 60 * 1000, // 1 day expiration
        });

        res.status(201).json({
            message: 'User registered and logged in successfully',
            data: { id: newUser._id, username: newUser.username, email: newUser.email }
        });
        // res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});

//* login route
router.post('/login', async (req, res) => {
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

        const token = jwt.sign({ id: user._id }, secretKey, { expiresIn: '1d' });

        res.cookie('token', token
            , {
                httpOnly: true, //Access only from the server side
                secure: process.env.NODE_ENV === 'production', //Only https in productivity mode
                sameSite: process.env.NODE_ENV === "production" ? "strict" : "lax",
                maxAge: 24 * 60 * 60 * 1000, // 1 day expire
            }
        );
        res.json({ data: { id: user._id, username: user.username, email: user.email }, statusCode: 200 });
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ message: 'Server error' });
    }
});


router.get("/userInfo", async (req, res) => {
    try {
        const { token } = req.cookies
        if (!token) {
            return res.json({ message: 'Unauthorized', statusCode: 401 });
        }
        const decoded = jwt.verify(token, secretKey);
        const user = await User.findById(decoded.id).select("-password"); // finding user using id (from token)
        if (!user) return res.status(404).json({ message: "User not found" });
        res.json({ data: user, userStatus: "Authorized" });

    } catch (err) {
        if (err.name === 'JsonWebTokenError') {
            return res.status(401).json({ message: 'Invalid token' });
        }
        res.status(500).json({ error: "Failed to fetch user" });
    }
});

//* logout route
router.post('/logout', (req, res) => {
    res.clearCookie('token', { httpOnly: true, secure: process.env.NODE_ENV === 'production' });
    res.status(200).json({ message: 'Logged out successfully', statusCode: 200 });
});

module.exports = router;
