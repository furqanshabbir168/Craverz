import express from 'express'
import { addManualOrder, getAllOrders, getCategorySales, getOrderDetail, getOrders, getOrderTypeDistribution, getTodayStats, placeCashOrder, placeStripeOrder, updateOrderStatus } from '../controller/orderController.js';
import authMiddleware from '../middleware/authMiddleware.js';


const orderRouter = express.Router();

orderRouter.post('/place-cod',authMiddleware,placeCashOrder);
orderRouter.post('/place-stripe',authMiddleware,placeStripeOrder)
orderRouter.get('/my-orders',authMiddleware,getOrders)
orderRouter.get('/all-orders',getAllOrders);
orderRouter.get('/today-stats',getTodayStats)
orderRouter.get('/get-category-sales',getCategorySales)
orderRouter.get('/get-order-type-distribution',getOrderTypeDistribution)
orderRouter.get('/:id',getOrderDetail)
orderRouter.post('/manual',addManualOrder)
orderRouter.put('/:id/update-status',updateOrderStatus);

export default orderRouter