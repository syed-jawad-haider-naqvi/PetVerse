import mongoose from "mongoose";

const chatSchema = new mongoose.Schema({
    members: [{
        type: mongoose.Schema.Types.ObjectId,
        refPath: 'memberType' // Correct reference for Users and Vets
    }],
    memberType: [{
        type: String,
        enum: ['user', 'vets'], // Changed from 'User' and 'Vet' to match MongoDB collections
        required: true
    }],
    lastMessage: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Message',
    }
}, { timestamps: { createdAt: true, updatedAt: false } });

const Chat = mongoose.model("Chat", chatSchema);
export default Chat;
