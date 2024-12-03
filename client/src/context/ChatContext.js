import React, { createContext, useState, useContext } from "react";

const ChatContext = createContext();

export const useChat = () => useContext(ChatContext);

export const ChatProvider = ({ children }) => {
  const [chats, setChats] = useState([]);

  const addChat = (
    chatId,
    item,
    sellerId,
    sellerName,
    context,
    messages = []
  ) => {
    setChats((prevChats) => {
      // Check if the chat already exists
      const exists = prevChats.some((chat) => chat.chatId === chatId);
      if (exists) {
        return prevChats; // Avoid duplicate chats
      }

      // Create a new chat
      const newChat = {
        chatId,
        item,
        sellerId,
        sellerName,
        context,
        messages,
      };

      // Add the new chat
      const updatedChats = [...prevChats, newChat];

      localStorage.setItem("chats", JSON.stringify(updatedChats)); // Save chats to local storage

      return updatedChats;
    });
  };

  const addMessage = (chatId, message) => {
    setChats((prevChats) => {
      const updatedChats = prevChats.map((chat) =>
        chat.chatId === chatId
          ? { ...chat, messages: [...chat.messages, message] }
          : chat
      );

      localStorage.setItem("chats", JSON.stringify(updatedChats)); // Save updated chats

      return updatedChats;
    });
  };

  return (
    <ChatContext.Provider value={{ chats, setChats, addChat, addMessage }}>
      {children}
    </ChatContext.Provider>
  );
};
