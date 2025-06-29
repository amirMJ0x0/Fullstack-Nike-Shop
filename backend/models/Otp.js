const mongoose = require("mongoose");

const otpSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
    },
    otp: {
        type: String,
        required: true,
    },
    purpose: {
        type: String,
        enum: ['email-verification', 'password-reset', 'email-change'],
        required: true,
    },
    newEmail: {
        type: String,
        // Only required for email-change purpose
    },
    expiresAt: {
        type: Date,
        required: true,
    },
}, { timestamps: true });

otpSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 }); //delete after expiration
module.exports = mongoose.model('otp', otpSchema);