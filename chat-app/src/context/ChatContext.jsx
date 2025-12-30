import { createContext, useContext, useState } from "react";

const ChatContext = createContext();

export function ChatProvider({ children }) {
  const [user, setUser] = useState({
    name: localStorage.getItem("username") || "Anonim",
    status: "Dostępny",
  });

  const [settings, setSettings] = useState({
    showTime: true,
  });

  const [contacts, setContacts] = useState([
    { id: 1, name: "Bot" },
  ]);

  const [currentContact, setCurrentContact] = useState(1);

  const [messages, setMessages] = useState({
    1: [],
  });

  const addContact = (name) => {
    const id = Date.now();
    setContacts((prev) => [...prev, { id, name }]);
    setMessages((prev) => ({ ...prev, [id]: [] }));
  };

  const addMessage = (contactId, text, edited = false) => {
    const timestamp = new Date().toLocaleTimeString();
    setMessages((prev) => ({
      ...prev,
      [contactId]: [
        ...prev[contactId],
        { text, from: "me", time: timestamp, edited },
      ],
    }));
  };

  const addBotReply = (contactId) => {
    const replies = ["OK!", "Ciekawe!", "Haha", "No nie wiem...", "Dobra!"];
    const random = replies[Math.floor(Math.random() * replies.length)];
    const timestamp = new Date().toLocaleTimeString();

    setTimeout(() => {
      setMessages((prev) => ({
        ...prev,
        [contactId]: [
          ...prev[contactId],
          { text: random, from: "bot", time: timestamp },
        ],
      }));
    }, 2000);
  };

  return (
    <ChatContext.Provider
      value={{
        user,
        setUser,
        settings,
        setSettings,
        contacts,
        setContacts,
        currentContact,
        setCurrentContact,
        messages,
        addMessage,
        addBotReply,
        addContact,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
}

export function useChatContext() {
  return useContext(ChatContext);
}
