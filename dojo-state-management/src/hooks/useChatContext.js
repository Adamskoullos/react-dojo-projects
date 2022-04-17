import React, { createContext, useContext } from "react";
import { useChatReducer } from "../reducers/chatReducer";

const ChatContext = createContext();

// React Component
export const ChatProvider = ({ children }) => {
  const [state, dispatch] = useChatReducer();

  return (
    <ChatContext.Provider value={{ state, dispatch }}>
      {children}
    </ChatContext.Provider>
  );
};

export const useChat = () => useContext(ChatContext);
