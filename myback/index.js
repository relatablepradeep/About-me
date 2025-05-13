import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { createServer } from "http";
import { Server } from "socket.io";
import { connect } from "./connection.js";
import Email from './Route/email.route.js';



import mongoose from 'mongoose'
import  http from 'http';
import { initializeSocket } from './socket';

// Import routes
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/user');



// Import routes
import  authRoutes from './routes/auth';
import  userRoutes = require('./routes/user');
const messageRoutes = require('./routes/message');

// const app = express();
const server = http.createServer(app);

// Initialize Socket.IO
const io = initializeSocket(server);

// Middleware
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}));
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/messages', messageRoutes);

// Connect to MongoDB
mongoose.connect(process.env.Url)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Could not connect to MongoDB', err));

// Start server
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});








dotenv.config({ path: "./.env" });

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"]
  }
});

app.use(cors());
app.use(express.json());
app.use("/email", Email);

// Mongo connection
const apiPort = process.env.API_PORT || 3005;
connect()
  .then(() => {
    httpServer.listen(apiPort, () => {
      console.log(`Server running on http://localhost:${apiPort}`);
    });
  })
  .catch((err) => {
    console.error(`MongoDB connection failed: ${err}`);
  });



