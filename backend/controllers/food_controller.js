import foodModel from "../Models/Food_model.js";
import fs from 'fs'

const addFood = async (req, res) => {

    let image_filename = `${req.file.filename}`;

    const food = new foodModel({
        name: req.body.name,
        price: req.body.price,
        description: req.body.description,
        category: req.body.category,
        image: image_filename,
    })

    try {
        await food.save();
        res.status(201).json({
            message: "Food item added successfully",
            success: true,
        })
    }
    catch (err) {
        console.log(err);
        res.status(500).json({
            message: "Failed to add food item",
            success: false
        })
    }

}


const listFood = async (req, res) => {
    try {
        const foods = await foodModel.find({});
        res.json({
            success: true,
            data: foods
        })
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Failed to fetch food list"
        })
    }
}

const removeFood = async (req, res) => {
    try {
        const food = await foodModel.findById(req.body.id);
        fs.unlink(`uploads/${food.image}`,()=>{})
        await foodModel.findByIdAndDelete(req.body.id);
        res.json({
            success: true,
            message: "Food item removed successfully",
        })
    }
    catch (err) {
        console.log(err);
        res.status(500).json({
            success: false,
            message: "Failed to remove food item",
        })
    }
}

        export { addFood, listFood , removeFood}