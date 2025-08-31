import express from 'express';
import cors from 'cors';
import { connectDB } from './config/dataBase.js';
import userRouter from './routes/userRoutes.js';
import { serve } from "inngest/express";
import { inngest, functions } from "./inngest/index.js"
import adminRouter from './routes/adminRoutes.js';
import foodRouter from './routes/foodRoutes.js';
import orderRouter from './routes/orderRoutes.js';
import { stripeWebhook } from './controller/orderController.js';
import reservationRouter from './routes/reservationRoutes.js';
import faqRouter from './routes/faqRoutes.js';

const PORT = 4000;
const app = express();

// Middleware
app.use(cors());
// app.use(cors({
//     origin: [
//     "https://cravez.vercel.app",
//   ],
//   credentials: true
// }));

app.post(
  "/api/webhook",
  express.raw({ type: "application/json" }),
  stripeWebhook
);

app.use(express.json());

// Connect DB
await connectDB();

// Test Route
app.get('/', (req, res) => {
  res.json('Hello from Craverz');
});

// User Routes
app.use('/api/user', userRouter);
app.use('/api/admin',adminRouter);
app.use('/api/food',foodRouter)
app.use('/api/order',orderRouter)
app.use('/api/reservation',reservationRouter)
app.use('/api/faq',faqRouter)

// inngest routes
app.use("/api/inngest", serve({ client: inngest, functions }));

// Start Server
app.listen(PORT, () => {
  console.log(`Server is running successfully on http://localhost:${PORT}`);
});
