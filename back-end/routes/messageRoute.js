// routes/messageRoute.js
import express from "express";
import Message from "../models/messageModel.js";

const messageRouter = express.Router();

// Get chat history between user and doctor
messageRouter.get("/:userId/:doctorId", async (req, res) => {
  const { userId, doctorId } = req.params;

  try {
    const messages = await Message.find({
      $or: [
        { sender: userId, receiver: doctorId },
        { sender: doctorId, receiver: userId },
      ],
    }).sort({ timestamp: 1 });

    res.json(messages);
  } catch (error) {
    console.error("Error fetching messages:", error);
    res.status(500).json({ error: "Failed to fetch messages" });
  }
});

// Mark messages as read
messageRouter.put("/messages/read", async (req, res) => {
  const { userId, doctorId } = req.body;

  try {
    await Message.updateMany(
      { sender: doctorId, receiver: userId, read: false },
      { $set: { read: true } }
    );

    res.json({ success: true });
  } catch (error) {
    console.error("Error marking messages as read:", error);
    res.status(500).json({ error: "Failed to mark messages as read" });
  }
});

export default messageRouter;
