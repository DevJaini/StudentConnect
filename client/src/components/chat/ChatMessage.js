import React from "react";
import "./chat.css"; // Import CSS for styling

const ChatMessage = ({ chat }) => {
  const lastMessage =
    chat.messages.length > 0 ? chat.messages[chat.messages.length - 1] : null;

  return (
    <div className="chat-message">
      <div className="chat-header">
        <img
          src={chat.item.images[0]} // Assuming you have a seller's profile image URL
          alt={chat.sellerName}
          className="chat-avatar"
        />
        <div className="chat-details">
          <h4>{chat.sellerName}</h4>
          <p className="message-text">
            {lastMessage ? lastMessage.text : "No messages yet."}
          </p>
          <span className="timestamp">
            {lastMessage
              ? new Date(lastMessage.timestamp).toLocaleString()
              : ""}
          </span>
        </div>
      </div>
    </div>
  );
};

export default ChatMessage;
