import express from 'express';
import { createReservation, getReservations } from '../controller/reservationController.js';
import authMiddleware from '../middleware/authMiddleware.js';


const reservationRouter = express.Router();

reservationRouter.post('/create',authMiddleware,createReservation)
reservationRouter.get('/my-reservations',authMiddleware,getReservations)

export default reservationRouter