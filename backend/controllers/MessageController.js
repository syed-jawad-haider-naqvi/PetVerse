import Message from "../models/messageModel.js";
import Chat from "../models/chatModel.js";
import User from "../models/userModel.js";
import Vet from "../models/vetModel.js";
import cloudinary from "cloudinary";

// Configure Cloudinary
cloudinary.v2.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_SECRET_KEY,
});

// Send a message (with optional image)
export const sendMessage = async (req, res) => {
    try {
        const { chatId, senderId, senderType, text, image } = req.body;

        // Validate required fields
        if (!chatId || !senderId || !senderType) {
            return res.status(400).json({ error: "Missing required fields" });
        }

        // Validate chat exists
        const chatExists = await Chat.findById(chatId);
        if (!chatExists) {
            return res.status(404).json({ error: "Chat not found" });
        }

        let imageUrl = null;
        
        // Handle image upload if present
        if (image) {
            try {
                // Add error handling for Cloudinary upload
                const uploadRes = await cloudinary.v2.uploader.upload(image, { 
                    folder: "chat_images",
                    resource_type: "image",
                    timeout: 60000, // Longer timeout for large images
                });
                imageUrl = uploadRes.secure_url;
            } catch (uploadError) {
                console.error("Cloudinary upload error:", uploadError);
                return res.status(400).json({ 
                    error: "Image upload failed", 
                    details: uploadError.message 
                });
            }
        }

        // Create and save the message
        const newMessage = new Message({
            chatId,
            senderId,
            senderType,
            text: text || "",
            image: imageUrl,
        });

        await newMessage.save();
        
        // Update the chat with the last message
        await Chat.findByIdAndUpdate(chatId, { 
            lastMessage: newMessage._id,
            updatedAt: Date.now()
        });

        // Return the populated message
        const populatedMessage = await Message.findById(newMessage._id)
            .populate({
                path: "senderId",
                select: "name email image senderType"
            });

        res.status(201).json(populatedMessage);
    } catch (error) {
        console.error("Error in sendMessage:", error);
        res.status(500).json({ error: error.message });
    }
};


// Get all messages in a chat
export const getMessages = async (req, res) => {
    try {
        const { chatId } = req.params;
        console.log("IN GET MSG : ",chatId);
        const messages = await Message.find({ chatId })
        .populate({
            path: "senderId",
            select: "name email image senderType"
        });
    

        res.status(200).json(messages);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


// // Mark messages as seen
// export const markAsSeen = async (req, res) => {
//     try {
//         const { messageId } = req.params;
//         await Message.findByIdAndUpdate(messageId, { seen: true });
//         res.status(200).json({ message: "Message marked as seen" });
//     } catch (error) {
//         res.status(500).json({ error: error.message });
//     }
// };
