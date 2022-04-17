import React from "react";
import "./App.css";
import { Input } from "./components/Input";
import { Message } from "./components/Message";
import { ChatProvider, useChat } from "./hooks/useChatContext";
import { useScrollToBottom } from "./hooks/useScrollToBottom";
// import { useChatReducer } from "./reducers/chatReducer";

function App() {
  const { state } = useChat();
  const scrollRef = useScrollToBottom(state.messages);

  return (
    <div className="App" style={styles.wrapper}>
      <div style={styles.container} ref={(ref) => (scrollRef.current = ref)}>
        {state.messages.map((message) => (
          <Message key={message.id} message={message} />
        ))}
      </div>
      <Input />
    </div>
  );
}

export default App;

export const AppContainer = () => {
  return (
    <ChatProvider>
      <App />
    </ChatProvider>
  );
};

const styles = {
  container: {
    display: "flex",
    overflow: "auto",
    height: "max-content",
    flexDirection: "column",
  },
  wrapper: {
    display: "flex",
    height: "100vh",
    flexDirection: "column",
    justifyContent: "flex-end",
  },
};
