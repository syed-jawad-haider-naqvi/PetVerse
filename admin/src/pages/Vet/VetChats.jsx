import React, { useEffect, useState } from "react";
import { useContext } from "react";
import { DoctorContext } from "../../context/DoctorContext";
import ChatBox from "../../components/Chatbox";
import "../../styles/Chat.css";
import axios from "axios";

const VetChats = () => {
    const { profileData, getProfileData, getDoctorChats, doctorChats, backendUrl } = useContext(DoctorContext);
    const [currentChat, setCurrentChat] = useState(null);

    useEffect(() => {
        getProfileData();
    }, []);

    useEffect(() => {
        if (profileData) console.log("Updated Profile Data:", profileData);
    }, [profileData]);

    useEffect(() => {
        if (doctorChats) console.log("DoctorChats: ", doctorChats);
    }, [doctorChats]);

    useEffect(() => {
        if (profileData && profileData._id) {
            getDoctorChats();
        }
    }, [profileData]);

    const handleChatSelection = (chat) => {
        console.log("Selecting chat:", chat);
        if (chat) {
            setCurrentChat(chat);
        } else {
            console.warn("No valid chat selected");
        }
    };

    return (
        <div className="flex flex-grow h-screen p-4"> {/*  Ensure chat fills space */}
            <div className="w-1/4 bg-gray-100 rounded-lg overflow-y-auto p-2"> {/*  Chat List Side */}
                <h2 className="text-xl font-semibold">Chats</h2>
                <div className="mt-2">
                    {doctorChats.length > 0 ? (
                        doctorChats.map((chat) => (
                            <div
                                className={`chat-contact p-2 rounded-lg cursor-pointer ${
                                    currentChat?._id === chat._id ? "bg-blue-200" : ""
                                }`}
                                key={chat._id}
                                onClick={() => handleChatSelection(chat)}
                            >
                                <p className="font-medium">{chat.members.find(m => m._id !== profileData?._id)?.name || "Unknown User"}</p>
                            </div>
                        ))
                    ) : (
                        <p className="text-gray-500">No messages yet</p>
                    )}
                </div>
            </div>

            {/*  ChatBox Expands Fully in Remaining Space */}
            <div className="flex-grow flex flex-col bg-white shadow-lg rounded-lg p-4">
                <ChatBox chat={currentChat || {}} userType="vets" currentUserId={profileData?._id} />
            </div>
        </div>
    );
};

export default VetChats;