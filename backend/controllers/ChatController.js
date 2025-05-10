import Chat from "../models/chatModel.js";
import Message from "../models/messageModel.js";
import userModel from "../models/userModel.js";  
import vetModel from "../models/vetModel.js";  

export const getOrCreateChat = async (req, res) => {
    try {
        const { senderId, receiverId, senderType, receiverType } = req.body;
        console.log("In getOrCreateChat ", senderId, receiverId, senderType, receiverType);

        let chat = await Chat.findOne({
            members: { $all: [senderId, receiverId] }
        });

        if (!chat) {
            chat = new Chat({
                members: [senderId, receiverId],
                memberType: [senderType, receiverType],
                lastMessage: null
            });
            await chat.save();
        }

        // Populate members correctly using refPath
        await chat.populate({
            path: "members",
            select: "name email image"
        });

        res.status(200).json(chat);
    } catch (error) {
        console.error("Error in getOrCreateChat:", error);
        res.status(500).json({ error: error.message });
    }
};





// Get all chats for a user
// Get all chats for a user
export const getUserChats = async (req, res) => {
    try {
        const { userId } = req.params;
        console.log("In getUserChats Backend", userId);

        const chats = await Chat.find({ members: userId })
            .populate({
                path: "members",
                select: "name email image",
                model: function (doc, i) {
                    return doc.memberType[i] === "user" ? userModel : vetModel;
                }
            })
            .populate("lastMessage");

        res.status(200).json(chats);
    } catch (error) {
        console.error("Error in getUserChats:", error);
        res.status(500).json({ error: error.message });
    }
};

// Get all chats for a doctor
export const getDoctorChats = async (req, res) => {
    try {
        const { docId } = req.query; // Extract from query parameters
        console.log("In getDoctorChats Backend", docId);

        if (!docId) {
            return res.status(400).json({ message: "Doctor ID is required" });
        }

        const chats = await Chat.find({ members: docId })
            .populate({
                path: "members",
                select: "name email image",
            })
            .populate("lastMessage");
        console.log(chats)
        res.status(200).json(chats);
    } catch (error) {
        console.error("Error in getDoctorChats:", error);
        res.status(500).json({ error: error.message });
    }
};

