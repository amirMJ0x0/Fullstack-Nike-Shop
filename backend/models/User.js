const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    refreshToken: { type: String },
    favorites: [{ type: mongoose.Schema.Types.ObjectId, ref: "Product" }],
    isVerified: {
        type: Boolean,
        default: false,
    },
    fullName: { type: String },
    phone: { type: String },
    address: { type: String },
    city: { type: String },
    postalCode: { type: String },
    country: { type: String },
}, {
    timestamps: true
});

module.exports = mongoose.model('User', userSchema);
