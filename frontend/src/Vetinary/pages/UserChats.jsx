import React, { useEffect, useState } from "react";
import { useContext } from "react";
import { AppContext } from "../context/AppContext";
import ChatBox from "../components/Chatbox";
import "../styles/Chat.css";
import axios from "axios";

const UsersChats = () => {
  const { doctors, getVetsData, userData, backendUrl } = useContext(AppContext);
  const [currentChat, setCurrentChat] = useState(null);
  const [selectedChatId, setSelectedChatId] = useState(null); 

  useEffect(() => {
    getVetsData();
  }, []);

  const handleChatSelection = async (doctor) => {
    console.log("Doctor selected for chat:", doctor);
    console.log("User Data:", userData);

    if (!userData || !userData._id) {
      console.error("Error: User data is missing");
      return;
    }

    try {
      const { data } = await axios.post(`${backendUrl}/api/chat`, {
        senderId: userData._id,
        receiverId: doctor._id,
        senderType: "user",
        receiverType: "vets",
      });

      console.log("Chat Data Received:", data);
      setCurrentChat(data);
      setSelectedChatId(doctor._id); 
    } catch (error) {
      console.error("Error creating/getting chat:", error.response?.data || error.message);
    }
  };

  return (
    <div className="App mx-[-110px]">
      <div className="Chat">
        <div className="Left-side-chat rounded-2xl bg-amber-50">
          <h1 className="ml-3 text-lg mb-3">Feel free to consult with our vets about your pet</h1>
          <div className="Chat-list overflow-scroll-y flex flex-col">
            {doctors.map((doctor) => (
              <div
                className={`chat-contact flex conversation p-2 rounded-lg cursor-pointer 
                  ${selectedChatId === doctor._id ? "bg-green-500" : "hover:bg-gray-100"}`}
                key={doctor._id}
                onClick={() => handleChatSelection(doctor)}
              >
                <img className="max-w-12 rounded-2xl" src={doctor.image} alt="" />
                <p className="pt-3 font-bold">{doctor.name}</p>
              </div>
            ))}
          </div>
        </div>
        <ChatBox chat={currentChat || {}} userType="user" currentUserId={userData?._id} />
      </div>
    </div>
  );
};

export default UsersChats;