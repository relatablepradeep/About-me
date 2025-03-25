import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connection from "./connection.js";
import http from 'http';
import { Server } from 'socket.io';
import jwt from 'jsonwebtoken'; 
import Email from './Route/email.route.js'

dotenv.config({ path: "./.env" }); 

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Run Express API on 3005
const apiPort = process.env.API_PORT || 3005;

connection()
  .then(() => {
    app.listen(apiPort, () => {
      console.log(`API Server is running on port ${apiPort}`);
    });
  })
  .catch((err) => {
    console.error(`MongoDB is not connected: ${err}`);
  });

app.get("/api/", (req, res) => {
  res.send("Hey Pradeep");
});



app.use('/email',Email)

// ⚡ Create separate WebSocket server on 4000
const server = http.createServer();
const io = new Server(server, {
    cors: {
        origin: "http://localhost:5173", // Change this to your frontend URL
        methods: ["GET", "POST"]
    }
});

const users = {};

// 🔒 Authenticate WebSocket connection
io.use((socket, next) => {
  const token = socket.handshake.auth?.token;
  if (!token) return next(new Error('Authentication error'));

  jwt.verify(token, process.env.OAUTH_SECRET, (err, decoded) => {
      if (err) return next(new Error('Invalid token'));

      socket.user = decoded;
      users[socket.user.email] = socket.id; // Store user socket ID
      next();
  });
});

// 🎯 Handle real-time messages
io.on('connection', (socket) => {
  console.log(`User connected: ${socket.user.email}`);

  socket.on('userMessage', (message) => {
      console.log(`Message from ${socket.user.email}:`, message);
      io.emit('adminMessage', { user: socket.user.email, message }); // Send to admin
  });

  socket.on('adminMessage', ({ email, message }) => {
      const userSocketId = users[email]; // Get user's socket ID
      if (userSocketId) {
          io.to(userSocketId).emit('userMessage', { message, from: 'Admin' });
      }
  });

  socket.on('disconnect', () => {
      console.log(`User disconnected: ${socket.user.email}`);
      delete users[socket.user.email];
  });
});

// ✅ Start WebSocket Server on 4000
server.listen(4000, () => {
    console.log('WebSocket Server is running on port 4000');
});
