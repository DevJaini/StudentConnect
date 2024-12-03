import React from "react";
import { useChat } from "../../context/ChatContext";
import { useUser } from "../../context/userContext";
import ChatMessage from "./ChatMessage";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import "./chat.css";

const ChatHistory = () => {
  const { chats } = useChat();
  const { user } = useUser();
  const navigate = useNavigate(); // Initialize useNavigate

  const userChats = chats.filter(
    (chat) =>
      chat.sellerId === user.id ||
      chat.messages.some((msg) => msg.senderId === user.id)
  );

  // Handle chat item click
  const handleChatClick = (chat) => {
    navigate("/chat", {
      state: {
        item: chat.item,
        itemId: chat.item.id,
        sellerId: chat.sellerId,
        sellerName: chat.sellerName,
        itemType: chat.context,
      },
    });
  };

  return (
    <div className="chat-history">
      {userChats.length > 0 ? (
        userChats.map((chat) => (
          <div
            key={chat.chatId}
            onClick={() => handleChatClick(chat)} // Use handleChatClick to navigate
          >
            <ChatMessage chat={chat} />
          </div>
        ))
      ) : (
        <p>No chats available.</p>
      )}
    </div>
  );
};

export default ChatHistory;
