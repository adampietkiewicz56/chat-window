import { createContext, useContext, useState } from "react";

const ChatContext = createContext();

export function ChatProvider({ children }) {
  // user: null
  const [user, setUser] = useState(() => {
    const storedName = localStorage.getItem("username");
    return storedName
      ? { name: storedName, status: "Dostępny" }
      : null;
  });

  const [settings, setSettings] = useState({
    showTime: true,
  });

  const [contacts, setContacts] = useState([
    { id: 1, name: "Bot" },
  ]);

  const [currentContact, setCurrentContact] = useState(1);

  const [messages, setMessages] = useState({
    1: [], // bot
  });

  const addContact = (name) => {
    const id = Date.now();
    setContacts((prev) => [...prev, { id, name }]);
    setMessages((prev) => ({ ...prev, [id]: [] }));
  };

  const addMessage = (contactId, text, edited = false) => {
    console.log(localStorage.getItem("username"), " wysłał wiadomość", text)
    const timestamp = new Date().toLocaleTimeString();
    setMessages((prev) => ({
      ...prev,
      [contactId]: [
        ...prev[contactId],
        { text, from: "me", time: timestamp, edited },
      ],
    }));
  };

  const editMessage = (contactId, index, newText) => {
    setMessages((prev) => {
      const updated = [...prev[contactId]];
      updated[index] = {
        ...updated[index],
        text: newText,
        edited: true,
      };

      return {
        ...prev,
        [contactId]: updated,
      };
    });
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

  // Logout
  const logout = () => {
    console.log("Wylogowano");
    localStorage.removeItem("username");
    setUser(null);
  };

  return (
    <ChatContext.Provider
      value={{
        user,
        setUser,
        logout,
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
        editMessage,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
}

export function useChatContext() {
  return useContext(ChatContext);
}
