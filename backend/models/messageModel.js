import mongoose from "mongoose";

const messageSchema = new mongoose.Schema({
    chatId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Chat",
        required: true,
    },
    senderId: {
        type: mongoose.Schema.Types.ObjectId,
        refPath: "senderType",
        required: true,
    },
    senderType: {
        type: String,
        enum: ["user", "vets"],
        required: true,
    },
    text: {
        type: String,
    },
    image: {
        type: String, // Cloudinary URL
        default: null,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    }
});

const Message = mongoose.model("Message", messageSchema);
export default Message;
