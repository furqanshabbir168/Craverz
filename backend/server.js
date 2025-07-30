import express from 'express';
import cors from 'cors';
import { connectDB } from './config/dataBase.js';
import userRouter from './routes/userRoutes.js';

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

// Start Server
app.listen(PORT, () => {
  console.log(`Server is running successfully on http://localhost:${PORT}`);
});
