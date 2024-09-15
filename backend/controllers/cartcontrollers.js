import userModel from '../Models/User_model.js'

const addtoCart = async (req, res) => {
    try {
        let userData = await userModel.findOne({ _id: req.body.userId });
        let cartdata = userData.cartData || {};
        if (!cartdata[req.body.itemId]) {
            cartdata[req.body.itemId] = 1;
        } else {
            cartdata[req.body.itemId] += 1;
        }
        await userModel.findByIdAndUpdate(req.body.userId, { cartData: cartdata });
        res.json({
            success: true,
            message: "Added to cart"
        });
    }
    catch (err) {
        console.log(err);
        res.json({
            success: false,
            message: "Error"
        });
    }
}
const removerfromCart = async (req, res) => {
    try {
        let userData = await userModel.findOne({ _id: req.body.userId }); 
        let cartdata = userData.cartData || {};

        if (cartdata[req.body.itemId] > 0) {
            cartdata[req.body.itemId] -= 1;
            if (cartdata[req.body.itemId] === 0) {
                delete cartdata[req.body.itemId];
            }
        }
        await userModel.findByIdAndUpdate(req.body.userId, { cartData: cartdata }); 
        res.json({
            success: true,
            message: "Removed from cart"
        });
    }
    catch (err) {
        console.log(err);
        res.json({
            success: false,
            message: "Error"
        });
    }
}

//get all item froms cart

const getCart = async (req, res) => {
    try {
        let userData = await userModel.findOne({ _id: req.body.userId });
        if (!userData) {
            return res.json({
                success: false,
                message: "User not found"
            });
        }
        let cartData = userData.cartData || []; 
        res.json({
            success: true,
            cartData
        });
    } catch (err) {
        console.log(err);
        res.json({
            success: false,
            message: "Error retrieving cart"
        });
    }
};


export { addtoCart, removerfromCart, getCart }