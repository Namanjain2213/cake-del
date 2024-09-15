import UserModel from '../Models/User_model.js'
import jwt from "jsonwebtoken"
import bcrypt from "bcryptjs"
import validator from "validator"
import 'dotenv/config'


const loginUser = async (req, res) => {
    try {
        const { email, name, password } = req.body
        if (!email || !password) {
            return res.status(400).json({
                message: "Please enter all fields",
                success: false
            })
        }
        const user = await UserModel.findOne({ email })
        if (!user) {
            return res.status(400).json({
                message: "User not found",
                success: false
                })            
        }
        const isMatch = await bcrypt.compare(password, user.password)
            if (!isMatch) {
                return res.status(400).json({
                    message: "Invalid password",
                    success: false
                })
            }
            const token = createToken(user._id)
            res.json({
                message: "Login successful",
                success: true,
                token
            })
    }
    catch (err) {
        console.log(err)
        res.json({
            message: "Error occurred",
            success: false
        })
    }
}

const createToken = (id) => {
    return jwt.sign({ id }, process.env.SECRET_KEY)
}

//register user
const registerUser = async (req, res) => {
    try {
        const { email, name, password } = req.body
        if (!email || !name || !password) {
            return res.status(400).json({
                message: "Please enter all fields",
                success: false
            })
        }
        const exists = await UserModel.findOne({ email })
        if (exists) {
            return res.status(400).json({
                message: "Email already exists",
                success: false
            })
        }
        if (!validator.isEmail(email)) {
            return res.status(400).json({
                message: "Invalid email",
                success: false
            })
        }
        if (password.length < 8) {
            return res.status(400).json({
                message: "Password must be at least 8 characters",
                success: false
            })
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const newuser = new UserModel({
            email,
            name,
            password: hashedPassword
        })
        const user = await newuser.save()
        const token = createToken(user._id)


        res.status(201).json({
            message: "User created successfully",
            success: true,
            token
        })
    }
    catch (err) {
        console.log(err);
        res.status(500).json({
            message: "Internal server error",
            success: false
        })
    }
}

export { loginUser, registerUser };
