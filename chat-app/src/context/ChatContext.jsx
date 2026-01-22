import { createContext, useContext, useEffect, useState } from "react";

const ChatContext = createContext();

export function ChatProvider({ children }) {
  /* ================= USER ================= */
  const [user, setUser] = useState(() => {
    const name = localStorage.getItem("username");
    const status = localStorage.getItem("userStatus") || "Dostępny";
    return name ? { name, status } : null;
  });

  useEffect(() => {
    if (!user) return;
    localStorage.setItem("username", user.name);
    localStorage.setItem("userStatus", user.status);
  }, [user]);

  const login = (name) => {
    setUser({ name, status: "Dostępny" });
  };

  const logout = () => {
    localStorage.removeItem("username");
    localStorage.removeItem("userStatus");
    setUser(null);
  };

  useEffect(() => {
    if (!user) {
      setContacts([{ id: 1, name: "Bot" }]);
      setMessages({ 1: [] });
      setCurrentContact(1);
    }
  }, [user]);

  /* ================= SETTINGS ================= */
  const [settings, setSettings] = useState({
    showTime: true,
  });

  /* ================= CONTACTS ================= */
  const [contacts, setContacts] = useState([
    { id: 1, name: "Bot" },
  ]);

  const [currentContact, setCurrentContact] = useState(1);

  const addContact = (name) => {
    const id = Date.now();
    setContacts((prev) => [...prev, { id, name }]);
    setMessages((prev) => ({ ...prev, [id]: [] }));
  };

  /* ================= MESSAGES ================= */
  const [messages, setMessages] = useState({
    1: [],
  });

  const addMessage = (contactId, text) => {
    const timestamp = new Date().toLocaleTimeString();
    setMessages((prev) => ({
      ...prev,
      [contactId]: [
        ...prev[contactId],
        { text, from: "me", time: timestamp, edited: false },
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
      return { ...prev, [contactId]: updated };
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

  return (
    <ChatContext.Provider
      value={{
        user,
        login,
        logout,
        settings,
        setSettings,
        contacts,
        currentContact,
        setCurrentContact,
        messages,
        addMessage,
        editMessage,
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
