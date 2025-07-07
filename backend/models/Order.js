const mongoose = require('mongoose');

const orderItemSchema = new mongoose.Schema({
    product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
    name: String,
    price: Number,
    quantity: Number,
    image: String,
});

const orderSchema = new mongoose.Schema(
    {
        user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
        orderNumber: {
            type: String,
            unique: true,
        },
        items: [orderItemSchema],
        shippingInfo: {
            address: { type: String, required: true },
            city: { type: String, required: true },
            postalCode: { type: String, required: true },
            country: { type: String, required: true },
        },
        total: { type: Number, required: true },
        status: {
            type: String,
            enum: ["Pending", "Paid", "Shipped", "Delivered"],
            default: "Pending",
        },
        paymentInfo: {
            method: { type: String, required: true },
            paidAt: { type: Date },
            paymentResult: Object,
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model('Order', orderSchema); 