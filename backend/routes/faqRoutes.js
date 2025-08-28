import express from 'express';
import { faqController } from '../controller/faqController.js';

const faqRouter = express.Router();

faqRouter.get('/fetch',faqController);

export default faqRouter