import express from 'express'
import { addFood, listedFood } from '../controller/foodController.js';
import upload from '../config/upload.js';

const foodRouter = express.Router();

foodRouter.post('/add',upload.single('image'),addFood);
foodRouter.get('/list',listedFood)

export default foodRouter