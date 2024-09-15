import express from "express"
import { listorders, placeorder, updateStatus, userOrder, verifyOrder } from "../controllers/ordercontrollers.js"
import  authMiddleware from '../middlerware/auth.js'

const orderRouter = express.Router();

orderRouter.post('/place',authMiddleware,placeorder);
orderRouter.post('/verify',verifyOrder);
orderRouter.post('/userorders',authMiddleware,userOrder)
orderRouter.get('/list',listorders);
orderRouter.post('/status',updateStatus);
export default orderRouter;
