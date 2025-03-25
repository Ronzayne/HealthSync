import express from "express";
import cors from "cors";
import "dotenv/config";
import connectDB from "./config/mongodb.js";
import connectCloudinary from "./config/cloudinary.js";
import adminRouter from "./routes/adminRoute.js";
import doctorRouter from "./routes/doctorRoute.js";
import userRouter from "./routes/userRoute.js";
import http from "http";
import { Server } from "socket.io";
import jwt from "jsonwebtoken";
import Message from "./models/messageModel.js";
import messageRouter from "./routes/messageRoute.js";

// App config
const app = express();
const port = process.env.PORT || 4000;
connectDB();
connectCloudinary();

// Middlewares
app.use(express.json());
app.use(cors());

// API endpoints
app.use("/api/admin", adminRouter);
app.use("/api/doctor", doctorRouter);
app.use("/api/user", userRouter);
app.use("/api/messages", messageRouter);

app.get("/", (req, res) => {
  res.send("API WORKING");
});

// Create HTTP server
const server = http.createServer(app);

// Set up Socket.IO
const io = new Server(server, {
  cors: {
    origin: process.env.FRONTEND_URL,
    methods: ["GET", "POST"],
  },
});

// Socket.IO connection handler
io.on("connection", (socket) => {
  console.log("A user connected:", socket.id);
  const token = socket.handshake.query.token;

  if (!token) {
    console.error("No token provided");
    socket.disconnect();
    return;
  }

  console.log("Token received:", token);

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      console.error("Invalid token:", err);
      socket.disconnect();
      return;
    }

    console.log("Decoded token payload:", decoded);

    if (!decoded.userId) {
      console.error("userId not found in token payload");
      socket.disconnect();
      return;
    }

    socket.userId = decoded.userId; // Use decoded.userId
    console.log(`User ${socket.userId} authenticated successfully`);

    // Join room for user-doctor chat
    socket.on("joinRoom", (doctorId) => {
      if (!doctorId) {
        console.error("No doctorId provided");
        return;
      }

      const roomId = `${socket.userId}-${doctorId}`;
      socket.join(roomId);
      console.log(`User ${socket.userId} joined room ${roomId}`);
    });

    // Handle sending messages
    socket.on("sendMessage", async ({ receiver, receiverModel, content }) => {
      console.log("Received message:", { receiver, receiverModel, content });

      const message = new Message({
        sender: socket.userId, // Use socket.userId
        senderModel: "user", // Ensure this is set correctly
        receiver,
        receiverModel,
        content,
      });

      try {
        await message.save();
        console.log("Message saved to database:", message);

        const roomId = `${socket.userId}-${receiver}`; // Ensure the roomId is correct
        io.to(roomId).emit("receiveMessage", message); // Emit to the correct room
        console.log("Message sent to room:", roomId);
      } catch (error) {
        console.error("Error saving message:", error);
      }
    });

    // Handle disconnection
    socket.on("disconnect", () => {
      console.log("A user disconnected:", socket.id);
    });
  });
});

// Start the server
server.listen(port, () => console.log("Server Started on port", port));
