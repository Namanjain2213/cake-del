import ordermodel from "../Models/Order_model.js";
import userModel from '../Models/User_model.js';
import Stripe from "stripe";
import 'dotenv/config';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
const FRONTEND_URL = "https://cake-del.vercel.app";

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

        const line_items = req.body.items.map((item) => ({
            price_data: {
                currency: "inr",
                product_data: {
                    name: item.name,
                },
                unit_amount: item.price * 100,
            },
            quantity: item.quantity,
        }));
        line_items.push({
            price_data: {
                currency: "inr",
                product_data: {
                    name: "Delivery charges",
                },
                unit_amount: 30 * 100,
            },
            quantity: 1,
        });

        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            line_items,
            mode: 'payment',
            success_url: `${FRONTEND_URL}/verify?success=true&orderId=${neworder._id}`,
            cancel_url: `${FRONTEND_URL}/verify?success=false&orderId=${neworder._id}`
        });

        console.log('Stripe session created:', session); 

        res.json({
            success: true,
            session_url: session.url
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

    const { orderId, success } = req.body;
    try {
        if (success == "true") {
            await ordermodel.findByIdAndUpdate(orderId, { payment: true });
            res.json({
                success: true,
                message: "Paid"
            })
        }
        else {
            await ordermodel.findByIdAndDelete(orderId);
            res.json({
                success: false,
                message: "Not Paid"
            })
        }
    }
    catch (err) {
        console.error(err);
        res.json({
            success: false,
            message: "Internal Server Error"

        })
    }
}

const userOrder = async (req, res) => {
    try {
        const orders = await ordermodel.find({ userId: req.body.userId });
        res.json({
            success: true,
            data: orders
        })
    }
    catch (err) {
        console.error(err);
        res.json({
            success: false,
            message: "Internal Server Error"
        })
    }
}

const listorders = async (req, res) => {

    try {
        const orders = await ordermodel.find({})
        res.json({
            success: true,
            data: orders
        })
    }
    catch (err) {
        console.error(err);
        res.json({
            success: false,
            message: "Internal Server Error"
        })
    }
}

const updateStatus = async (req, res) => {
    try {
        await ordermodel.findByIdAndUpdate(req.body.orderId, { status: req.body.status })
        res.json({
            success: true,
            message: "Status Updated "
        })
    }
    catch (err) {
        console.error(err);
        res.json({
            success: false,
            message: "Internal Server Error"
        })
    }
}

export { placeorder, verifyOrder, userOrder, listorders, updateStatus };
