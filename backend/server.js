import express from 'express';
import cors from 'cors';
import { connectDB } from './config/dataBase.js';
import userRouter from './routes/userRoutes.js';
import { serve } from "inngest/express";
import { inngest, functions } from "./inngest/index.js"

const PORT = 4000;
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Connect DB
await connectDB();

// Test Route
app.get('/', (req, res) => {
  res.json('Hello from Craverz');
});

// User Routes
app.use('/api/user', userRouter);
// inngest routes
app.use("/api/inngest", serve({ client: inngest, functions }));

// Start Server
app.listen(PORT, () => {
  console.log(`Server is running successfully on http://localhost:${PORT}`);
});
