import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import "../styles/Chatbox.css";
import moment from "moment"; //  Import moment.js for date formatting
import {useLocation } from 'react-router-dom'

const ChatBox = ({ chat, userType, currentUserId }) => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const chatEndRef = useRef(null);

  const location = useLocation();
  

  // Function to format timestamps
  const formatTimeAgo = (timestamp) => {
    const now = moment();
    const messageTime = moment(timestamp);

    if (now.diff(messageTime, "minutes") < 6) {
      return `${now.diff(messageTime, "minutes")} mins ago`;
    } else if (now.isSame(messageTime, "day")) {
      return messageTime.format("hh:mm A");
    } else {
      return messageTime.format("DD/MM/YYYY hh:mm A");
    }
  };

  useEffect(() => {
    //  Only run this effect if the user is on the chats page
    if (location.pathname.includes("/chats") && chat) {
      const fetchMessages = () => {
        axios.get(`http://localhost:4000/api/message/${chat._id}`)
          .then((response) => setMessages(response.data))
          .catch((error) => console.error("Error fetching messages:", error));
      };

      fetchMessages(); // Fetch initially
      const interval = setInterval(fetchMessages, 5000); // Fetch every 5 seconds

      return () => clearInterval(interval); // Cleanup interval
    }
  }, [chat, location]); //  Depend on chat and location

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = () => {
    if (newMessage.trim() === "") return;

    axios
      .post("http://localhost:4000/api/message", {
        chatId: chat._id,
        senderId: currentUserId,
        senderType: userType,
        text: newMessage,
      })
      .then((response) => {
        setMessages((prev) => [...prev, response.data]);
        setNewMessage("");
      })
      .catch((error) => console.error("Error sending message:", error));
  };

  return (
    <div className="ChatBox-container">
      {chat ? (
        <>
          <div className="chat-body">
            {messages.length > 0 ? (
              messages.map((msg, index) => (
                <div key={index} className={`message ${msg.senderType === userType ? "sent" : "received"}`}>
                  {msg.text && <p>{msg.text}</p>}
                  {msg.image && <img src={msg.image} alt="Sent image" className="message-image" />}
                  <span className="message-time">{formatTimeAgo(msg.createdAt)}</span>
                </div>
              ))
            ) : (
              <p className="no-messages">No messages yet</p>
            )}
            <div ref={chatEndRef} />
          </div>

          {/* Input Box Fixed at Bottom */}
          <div className="chat-input-container">
            <input
              type="text"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder="Type a message..."
              className="chat-input"
            />
            <button onClick={sendMessage} className="send-button">Send</button>
          </div>
        </>
      ) : (
        <p className="text-xl ml-5 mt-5">Select a chat to start messaging</p>
      )}
    </div>
  );
};

export default ChatBox;
