
import Razorpay from "razorpay";
import crypto from "crypto";
import User from "../models/User.js";
import { PLANS } from "../constants/plans.js";

// Initialize Razorpay
// Note: In production, ensure these ENV variables are set
const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID || "rzp_test_placeholder",
    key_secret: process.env.RAZORPAY_KEY_SECRET || "bucket_secret",
});

export const createOrder = async (req, res) => {
    try {
        const { planId } = req.body;

        // Simple mapping of planId to amount (should ideally be in a DB or constant map with prices)
        // Using hardcoded prices matching frontend
        let amount = 0;
        if (planId === 'pro') amount = 999;
        else if (planId === 'expert') amount = 2499;
        else return res.status(400).json({ message: "Invalid plan" });

        const options = {
            amount: amount * 100, // amount in paisa
            currency: "INR",
            receipt: `receipt_${Date.now()}_${req.user.id}`,
        };

        const order = await razorpay.orders.create(options);
        res.json(order);
    } catch (error) {
        console.log("Create Order Error:", error);
        res.status(500).json({ message: "Something went wrong" });
    }
};

export const verifyPayment = async (req, res) => {
    try {
        const { razorpay_order_id, razorpay_payment_id, razorpay_signature, planId } = req.body;

        const body = razorpay_order_id + "|" + razorpay_payment_id;

        const expectedSignature = crypto
            .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET || "bucket_secret")
            .update(body.toString())
            .digest("hex");

        const isAuthentic = expectedSignature === razorpay_signature;

        if (isAuthentic) {
            // Payment successful, update user
            const user = await User.findById(req.user.id);
            user.plan = planId;
            // Reset limits or update subscription dates if needed
            await user.save();

            res.json({ message: "Payment successful" });
        } else {
            res.status(400).json({ message: "Invalid signature" });
        }
    } catch (error) {
        console.log("Verify Error:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

export const setFreePlan = async (req, res) => {
    try {
        const user = await User.findById(req.user.id);
        user.plan = "free";
        await user.save();
        res.json({ message: "Plan updated to Free" });
    } catch (e) {
        res.status(500).json({ message: "Error" });
    }
}
