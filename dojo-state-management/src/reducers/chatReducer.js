import { useReducer } from "react";

const initialState = {
  messages: [
    { id: 1, content: "Hey", from: "me" },
    { id: 2, content: "How are you", from: "Steve" },
    { id: 3, content: "I am good", from: "me" },
    { id: 4, content: "whats up", from: "me" },
    { id: 5, content: "all good", from: "Steve" },
  ],
  currentMessage: "",
};

const reducer = (state, action) => {
  switch (action.type) {
    case "setMessages":
      return { ...state, messages: action.messages };
    case "addMessage":
      return {
        ...state,
        currentMessage: "",
        messages: [
          ...state.messages,
          {
            id: state.messages.length + 1,
            content: action.message,
            from: action.from,
          },
        ],
      };
    case "setCurrentMessage":
      return { ...state, currentMessage: action.message };
  }
};

export const useChatReducer = () => useReducer(reducer, initialState);
