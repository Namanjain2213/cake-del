import express from "express";
import cors from "cors"
import { connectDB } from "./config/db.js";
import foodRouter from "./routes/foodRoutes.js";
import userRouter from "./routes/User_route.js";
import cartRouter from "./routes/Cartroute.js";
import orderRouter from "./routes/orderroute.js";
import 'dotenv/config';


const app = express()
const port = process.env.port || 3000;

app.use(express.json());
app.use(cors());

connectDB();

app.use("/api/food",foodRouter);
app.use("/images",express.static('uploads'))
app.use("/api/user",userRouter);
app.use("/api/cart",cartRouter);
app.use("/api/order",orderRouter);

app.get("/",(req,res)=>{
    res.send("app is running");
})

app.listen(port,()=>{
    console.log(`app is running on port  ${port}` );
})
