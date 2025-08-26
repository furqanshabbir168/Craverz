import express from 'express'
import { getOrders, placeCashOrder, placeStripeOrder } from '../controller/orderController.js';
import authMiddleware from '../middleware/authMiddleware.js';


const orderRouter = express.Router();

orderRouter.post('/place-cod',authMiddleware,placeCashOrder);
orderRouter.post('/place-stripe',authMiddleware,placeStripeOrder)
orderRouter.get('/my-orders',authMiddleware,getOrders)

export default orderRouter