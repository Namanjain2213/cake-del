import express from "express"
import { addtoCart,removerfromCart,getCart } from "../controllers/cartcontrollers.js"
import authMiddleware from "../middlerware/auth.js";
const cartRouter = express.Router();

cartRouter.post("/add",authMiddleware,addtoCart);
cartRouter.post("/remove",authMiddleware,removerfromCart);
cartRouter.post("/get",authMiddleware,getCart);

export default cartRouter;