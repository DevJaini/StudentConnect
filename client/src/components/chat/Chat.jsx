/* eslint-disable jsx-a11y/img-redundant-alt */
/* eslint-disable react-hooks/rules-of-hooks */
import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useChat } from "../../context/chatContext";
import { useUser } from "../../context/userContext"; // Assuming you have this context
import "./chat.css";

const ChatPage = () => {
  const location = useLocation(); // Access state passed via navigate
  const { item, itemId, sellerId, sellerName, itemType } = location.state || {}; // Extract sellerId, itemId, and itemType from state
  const { chats, setChats, addMessage, addChat } = useChat();
  const { user } = useUser(); // Get the logged-in user's data
  const [message, setMessage] = useState("");
  // Locate or initialize the chat

  const navigate = useNavigate();

  // Load chats from localStorage when the component mounts
  useEffect(() => {
    const storedChats = localStorage.getItem("chats");
    if (storedChats) {
      setChats(JSON.parse(storedChats)); // Restore chats from localStorage
    }
  }, [setChats]);
  const chat = chats.find(
    (c) => c.chatId === `${itemType}-${item.id}-${sellerId}`
  );

  // Redirect if no user is logged in
  if (!user) {
    return <div>You need to log in to view this chat.</div>;
  }

  // Create a new chat if it doesn't exist
  useEffect(() => {
    if (item && !chat) {
      addChat(
        `${itemType}-${itemId}-${sellerId}`,
        item,
        sellerId,
        sellerName,
        itemType,
        []
      );
    }
  }, [item, sellerName, sellerId, itemId, itemType, addChat, chat]); // This effect runs when itemDetails or chat changes

  // Save chats to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("chats", JSON.stringify(chats));
  }, [chats]);

  // Handle sending a message
  const handleSendMessage = () => {
    if (message.trim()) {
      const newMessage = {
        text: message,
        senderId: user.id, // Dynamic user ID
        timestamp: new Date().toISOString(),
        read: false,
      };

      addMessage(chat.chatId, newMessage); // Add message to the chat
      setMessage(""); // Clear message input
    }
  };

  return (
    <div className="chat-page">
      <button className="back-btn" onClick={() => navigate(-1)}>
        &larr; Return Back
      </button>
      {item && chat ? (
        <>
          <div className="chat-header">
            <img
              src={item.images[0]} // Dynamically use the first image from item
              alt="Item Image"
              className="listing-image"
            />
            <h3>{item.title}</h3>
          </div>

          <div className="messages-container">
            {chat.messages.length === 0 ? (
              <p>No messages yet. Start the conversation!</p>
            ) : (
              chat.messages.map((msg, index) => (
                <div
                  key={index}
                  className={`message ${
                    msg.senderId === user.id ? "user-message" : "seller-message"
                  }`}
                >
                  <p>{msg.text}</p>
                  <span style={{ fontSize: "small", color: "lightgreen" }}>
                    {new Date(msg.timestamp).toLocaleDateString()}{" "}
                    {new Date(msg.timestamp).toLocaleTimeString()}
                  </span>
                </div>
              ))
            )}
          </div>

          <div className="chat-input">
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Type a message..."
            />
            <button onClick={handleSendMessage}>Send</button>
          </div>
        </>
      ) : (
        <p>Loading chat...</p>
      )}
    </div>
  );
};

export default ChatPage;
