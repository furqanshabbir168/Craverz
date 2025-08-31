import express from 'express'
import { addFood, deleteFood, getTotalDishes, listedFood } from '../controller/foodController.js';
import upload from '../config/upload.js';

const foodRouter = express.Router();

foodRouter.post('/add',upload.single('image'),addFood);
foodRouter.get('/list',listedFood)
foodRouter.get('/total',getTotalDishes)
foodRouter.delete('/delete',deleteFood)

export default foodRouter