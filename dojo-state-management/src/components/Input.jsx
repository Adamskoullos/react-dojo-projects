import React from "react";
import { useChat } from "../hooks/useChatContext";

export const Input = () => {
  const { state, dispatch } = useChat();
  return (
    <textarea
      style={{ padding: 12 }}
      value={state.currentMessage}
      onChange={(e) =>
        dispatch({ type: "setCurrentMessage", message: e.target.value })
      }
      onKeyUp={(e) =>
        e.key === "Enter"
          ? dispatch({
              type: "addMessage",
              message: e.target.value,
              from: "me",
            })
          : null
      }
    />
  );
};
