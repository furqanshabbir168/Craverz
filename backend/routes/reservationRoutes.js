import express from 'express';
import { createReservation, getAllReservation, getReservationDetail, getReservations, getTodaysReservation, updateReservationStatus } from '../controller/reservationController.js';
import authMiddleware from '../middleware/authMiddleware.js';


const reservationRouter = express.Router();

reservationRouter.post('/create',authMiddleware,createReservation)
reservationRouter.get('/my-reservations',authMiddleware,getReservations)
reservationRouter.get('/all-reservations',getAllReservation)
reservationRouter.get('/today-reservations',getTodaysReservation)
reservationRouter.get('/:id',getReservationDetail);
reservationRouter.put('/:id/update-status',updateReservationStatus)

export default reservationRouter