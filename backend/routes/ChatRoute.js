import express from "express";
import { getOrCreateChat, getUserChats, getDoctorChats } from "../controllers/ChatController.js";

const chatRouter = express.Router();

// Create or retrieve chat (No Authentication)
chatRouter.post("/", getOrCreateChat);

// Get chats (No Authentication)
chatRouter.get("/", (req, res) => {
    const { userId, docId } = req.query; // Extract from query params

    if (userId) {
        getUserChats(req, res);
    } else if (docId) {
        getDoctorChats(req, res);
    } else {
        return res.status(400).json({ message: "Invalid request: Missing userId or docId" });
    }
});

export default chatRouter;
