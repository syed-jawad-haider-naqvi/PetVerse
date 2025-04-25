import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import "../styles/Chatbox.css";
import moment from "moment"; 
import {useLocation } from 'react-router-dom'


const ChatBox = ({ chat, userType, currentUserId }) => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [image, setImage] = useState(null);
  const chatEndRef = useRef(null);

  const location = useLocation();

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

  const formatTimeAgo = (timestamp) => {
    const now = moment();
    const messageTime = moment(timestamp);

    if (now.diff(messageTime, "minutes") < 10) {
      return `${now.diff(messageTime, "minutes")} mins ago`;
    } else if (now.isSame(messageTime, "day")) {
      return messageTime.format("hh:mm A");
    } else {
      return messageTime.format("DD/MM/YYYY hh:mm A");
    }
  };

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      alert("Image too large! Please select an image under 5MB.");
      return;
    }

    try {
      const resizedImage = await resizeImage(file, 800);
      setImage(resizedImage);
    } catch (error) {
      console.error("Error processing image:", error);
      alert("Failed to process image. Please try again.");
    }
  };

  const resizeImage = (file, maxWidth) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = (event) => {
        const img = new Image();
        img.src = event.target.result;
        img.onload = () => {
          if (img.width <= maxWidth) {
            resolve(event.target.result);
            return;
          }

          const elem = document.createElement("canvas");
          const scaleFactor = maxWidth / img.width;
          elem.width = maxWidth;
          elem.height = img.height * scaleFactor;

          const ctx = elem.getContext("2d");
          ctx.drawImage(img, 0, 0, elem.width, elem.height);

          let quality = 0.8;
          if (file.size > 3 * 1024 * 1024) quality = 0.6;

          const dataUrl = elem.toDataURL("image/jpeg", quality);
          resolve(dataUrl);
        };
        img.onerror = reject;
      };
      reader.onerror = reject;
    });
  };

  const sendMessage = () => {
    if (!newMessage.trim() && !image) return;

    axios
      .post("http://localhost:4000/api/message", {
        chatId: chat._id,
        senderId: currentUserId,
        senderType: userType,
        text: newMessage,
        image: image,
      })
      .then((response) => {
        setMessages([...messages, response.data]);
        setNewMessage("");
        setImage(null);
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
              <p className="no-messages">Select a chat to start messaging</p>
            )}
            <div ref={chatEndRef} />
          </div>
          {chat && (
            <div className="chat-input-container" style={{ display: "flex", alignItems: "center" }}>
              <input
                type="text"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                placeholder="Type a message..."
                className="chat-input"
                style={{ flex: 1, marginRight: "10px" }}
              />

              <div className="image-upload-container" style={{ display: "flex", alignItems: "center" }}>
                <label className="image-upload-button" style={{ display: "flex", alignItems: "center" }}>
                  <input
                    type="file"
                    accept="image/*"
                    className="image-upload-input"
                    onChange={handleImageChange}
                    style={{ display: "none" }}
                  />
                  <img className="w-10" src="https://img.icons8.com/fluency/48/image--v1.png" alt="Add Image"/>
                </label>
              </div>

              {image && <img src={image} alt="Preview" className="image-preview" style={{ maxWidth: "50px", marginLeft: "10px" }} />}

              <button onClick={sendMessage} className="send-button" style={{ marginLeft: "10px" }}>Send</button>
            </div>
          )}
        </>
      ) : (
        <p className="text-lg mt-5 ml-5">Select a chat to start messaging</p>
      )}
    </div>
  );
};

export default ChatBox;
