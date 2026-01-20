import { createContext, useContext, useEffect, useState } from "react";

const ChatContext = createContext();

export function ChatProvider({ children }) {
  const getInitials = (name) =>
    name
      .split(" ")
      .map((w) => w[0])
      .join("")
      .toUpperCase();

  const [user, setUser] = useState(() => {
    const storedName = localStorage.getItem("username");
    const storedStatus = localStorage.getItem("userStatus") || "Dostępny";
    return storedName
      ? { name: storedName, status: storedStatus, initials: getInitials(storedName) }
      : null;
  });

  const getUserDataKey = (name) => `chat:data:${name}`;
  const getDefaultData = () => ({
    contacts: [{ id: 1, name: "Bot" }],
    currentContact: 1,
    messages: { 1: [] },
  });
  const loadUserData = (name) => {
    try {
      const raw = localStorage.getItem(getUserDataKey(name));
      if (!raw) return getDefaultData();
      const data = JSON.parse(raw);
      // Basic shape guard
      if (!data || !Array.isArray(data.contacts) || !data.messages) {
        return getDefaultData();
      }
      // Ensure currentContact exists
      const ids = data.contacts.map((c) => c.id);
      const validCurrent = ids.includes(data.currentContact) ? data.currentContact : (ids[0] ?? 1);
      return { ...data, currentContact: validCurrent };
    } catch (_) {
      return getDefaultData();
    }
  };

  const [settings, setSettings] = useState({
    showTime: true,
  });

  const [contacts, setContacts] = useState([{ id: 1, name: "Bot" }]);

  const [currentContact, setCurrentContact] = useState(1);

  const [messages, setMessages] = useState({ 1: [] });

  // Load per-user data whenever user changes
  useEffect(() => {
    if (!user) {
      const def = getDefaultData();
      setContacts(def.contacts);
      setMessages(def.messages);
      setCurrentContact(def.currentContact);
      return;
    }
    const data = loadUserData(user.name);
    setContacts(data.contacts);
    setMessages(data.messages);
    setCurrentContact(data.currentContact);
  }, [user?.name]);

  // Persist per-user data on changes
  useEffect(() => {
    if (!user) return;
    try {
      const data = { contacts, messages, currentContact };
      localStorage.setItem(getUserDataKey(user.name), JSON.stringify(data));
    } catch (_) {}
  }, [user?.name, contacts, messages, currentContact]);

  const addContact = (name) => {
    const id = Date.now();
    setContacts((prev) => [...prev, { id, name }]);
    setMessages((prev) => ({ ...prev, [id]: [] }));
  };

  const addMessage = (contactId, text, edited = false) => {
    console.log(user?.name || "", " wysłał wiadomość", text);
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

  const login = (name, status = "Dostępny") => {
    try {
      localStorage.setItem("username", name);
      localStorage.setItem("userStatus", status);
    } catch (_) {}
    setUser({ name, status, initials: getInitials(name) });
  };

  // Logout
  const logout = () => {
    console.log("Wylogowano");
    localStorage.removeItem("username");
    localStorage.removeItem("userStatus");
    setUser(null);
  };

  return (
    <ChatContext.Provider
      value={{
        user,
        setUser,
        login,
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
