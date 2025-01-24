const mongoose = require('mongoose')
const updateTimestamp = require("../middleware/timestampsMiddleware");

const cartItemSchema = new mongoose.Schema({
    productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product", required: true },
    quantity: { type: Number, required: true, default: 1 }
})

const cartSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    items: [cartItemSchema],
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
},
    { timestamps: false } // جلوگیری از تنظیم خودکار timestamps توسط Mongoose

)

// اعمال Middleware
updateTimestamp(cartSchema);

module.exports = mongoose.model("Cart", cartSchema)