const axios = require("axios");
const Order = require("../models/Order");
const dotenv = require("dotenv");
dotenv.config();

const dollarPrice = 80000
const createZibalRequest = async (req, res) => {
    const { amount, orderId, callbackUrl } = req.body;
    try {
        const zibalRes = await axios.post("https://gateway.zibal.ir/v1/request", {
            merchant: process.env.ZIBAL_SANDBOX_KEY,
            amount: amount * dollarPrice,
            callbackUrl,
            orderId,
            description: `Payment for order ${orderId}`,
        });

        if (zibalRes.data.result === 100) {
            await Order.findByIdAndUpdate(orderId, {
                "paymentInfo.method": "Card",
                "paymentInfo.paymentResult.trackId": zibalRes.data.trackId,
                "paymentInfo.paymentResult.status": "WaitingForVerification"
            });

            return res.json({ paymentUrl: `https://gateway.zibal.ir/start/${zibalRes.data.trackId}` });
        } else {
            return res.status(400).json({ message: zibalRes.data.message });
        }
    } catch (err) {
        console.error("Zibal Request Error:", err);
        return res.status(500).json({ message: "Zibal request failed" });
    }
};

const verifyPayment = async (req, res) => {
    const { trackId } = req.body;

    try {
        const verifyRes = await axios.post("https://gateway.zibal.ir/v1/verify", {
            merchant: process.env.ZIBAL_SANDBOX_KEY,
            trackId,
        });

        if (verifyRes.data.result === 100) {
            const order = await Order.findOneAndUpdate(
                { "paymentInfo.paymentResult.trackId": trackId },
                {
                    status: "Paid",
                    "paymentInfo.paidAt": new Date(),
                    "paymentInfo.paymentResult.verifyStatus": verifyRes.data.result,
                },
                { new: true }
            );

            return res.json({
                success: true,
                message: "Payment verified",
                order
            });

        } else {
            return res.status(400).json({
                success: false,
                message: "Payment failed",
                details: verifyRes.data
            });

        }
    } catch (err) {
        console.error("Zibal Verify Error:", err);
        return res.status(500).json({ message: "Zibal verify failed", success: false });
    }
};

module.exports = { createZibalRequest, verifyPayment }