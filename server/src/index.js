import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors"; 
import authRoutes from './routes/authRoute.js';
import memberRoutes from './routes/memberRoutes.js';
import adminRoutes from './routes/adminRoutes.js';
import trainerRoutes from './routes/trainerRoutes.js';

dotenv.config();

const connectToDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URL);
    console.log(` 🍃🍃🍃🍃🍃🍃 MongoDB connected successfully!🍃🍃🍃🍃🍃🍃`);
  } catch (error) {
    console.error(`🍁🍁🍁🍁🍁 Database Connection failed 🍁🍁🍁🍁🍁`);
    process.exit(1);
  }
};

// Call the connection function
connectToDatabase();

const app = express();

const corsOptions = {
  origin: 'http://localhost:5000', 
  credentials: true, 
};

app.use(cors(corsOptions)); 

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

mongoose.connection.on('connected', () => {
  console.log('Mongoose connected to MongoDB');
});

mongoose.connection.on('error', (err) => {
  console.error('Mongoose connection error:', err);
});

mongoose.connection.on('disconnected', () => {
  console.log('Mongoose disconnected from MongoDB');
});

const gracefulShutdown = () => {
  mongoose.connection.close(false, () => {
    console.log('Mongoose connection closed');
    process.exit(0);
  });
};

process.on('SIGINT', gracefulShutdown);
process.on('SIGTERM', gracefulShutdown);

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});

app.use('/api/auth', authRoutes);
app.use('/api/member', memberRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/trainer', trainerRoutes);

app.use("*", (req, res, next) => {
  res.status(404).send("API not found: auth service");
});


app.use((err,req,res,next)=>{
    const statuscode=err.statuscode || 500;
    const message=err.message || 'internal server error';
    return res.status(statuscode).json({
        success:false,
        message,
        statuscode
    })
});

export default app;