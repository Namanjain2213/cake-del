import Razorpay from 'razorpay';
import ordermodel from "../Models/Order_model.js";
import userModel from '../Models/User_model.js';
import crypto from 'crypto';
import 'dotenv/config';

const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET,
});

const placeorder = async (req, res) => {
    try {
        const neworder = new ordermodel({
            userId: req.body.userId,
            items: req.body.items,
            amount: req.body.amount,
            address: req.body.address,
        });
        await neworder.save();
        await userModel.findByIdAndUpdate(req.body.userId, { cartData: {} });

        const options = {
            amount: req.body.amount * 100, // Amount in paise
            currency: "INR",
            receipt: neworder._id.toString(),
        };

        const razorpayOrder = await razorpay.orders.create(options);
        
        res.json({
            success: true,
            razorpay_order_id: razorpayOrder.id,
            orderId: neworder._id,
        });
    } catch (err) {
        console.error('Error placing order:', err);
        res.status(500).json({
            success: false,
            error: 'Internal Server Error'
        });
    }
};

const verifyOrder = async (req, res) => {
    try {
        const { razorpay_order_id, razorpay_payment_id, razorpay_signature, orderId } = req.body;
        const generatedSignature = crypto.createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
                                          .update(`${razorpay_order_id}|${razorpay_payment_id}`)
                                          .digest('hex');

        if (generatedSignature === razorpay_signature) {
            await ordermodel.findByIdAndUpdate(orderId, { payment: true }, { new: true });
            
            res.json({
                success: true,
                message: "Payment verified successfully",
            });
        } else {
            res.status(400).json({
                success: false,
                message: "Payment verification failed",
            });
        }
    } catch (err) {
        console.error('Error verifying payment:', err);
        res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });
    }
};

// Other functions remain the same...
const userOrder = async (req, res) => {
    try {
        const orders = await ordermodel.find({ userId: req.body.userId });
        res.json({
            success: true,
            data: orders
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });
    }
};

const listorders = async (req, res) => {
    try {
        const orders = await ordermodel.find({});
        res.json({
            success: true,
            data: orders
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });
    }
};

const updateStatus = async (req, res) => {
    try {
        await ordermodel.findByIdAndUpdate(req.body.orderId, { status: req.body.status });
        res.json({
            success: true,
            message: "Status Updated"
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });
    }
};

export { placeorder, verifyOrder, userOrder, listorders, updateStatus };
