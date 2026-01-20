import MessageInput from "./MessageInput";
import { useState } from "react";
import { useChatContext } from "../context/ChatContext";
import SettingsPanel from "./SettingsPanel";

export default function Conversation() {
  const { contacts, currentContact, messages, settings, editMessage } = useChatContext();
  const msgs = messages[currentContact] || [];
  const contact = contacts.find(c => c.id === currentContact);

  const [editIndex, setEditIndex] = useState(null);
  const [editText, setEditText] = useState("");

  const handleEdit = (index, currentText) => {
    setEditIndex(index);
    setEditText(currentText);
  };

  const saveEdit = (index) => {
    if (!editText.trim()) return;
    editMessage(currentContact, index, editText);
    setEditIndex(null);
    setEditText("");
  };

  return (
    <div className="conversation">
      <h3 className="conversation-header">
        Rozmowa z: {contact?.name}
      </h3>

      <div className="messages">
        {msgs.map((m, index) => (
          <div
            key={index}
            className={`message-container ${m.from === "me" ? "mine" : "bot"}`}
          >
            <div
              className="message-bubble"
              onClick={() => m.from === "me" && handleEdit(index, m.text)}
            >
              {editIndex === index && m.from === "me" ? (
                <>
                  <input
                    type="text"
                    value={editText}
                    onChange={(e) => setEditText(e.target.value)}
                  />
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      saveEdit(index);
                    }}
                  >
                    OK
                  </button>
                </>
              ) : (
                <span>{m.text}</span>
              )}
            </div>
            {settings.showTime && <small className="message-time">{m.time}</small>}
            {m.edited && <small className="message-time"> (edytowano)</small>}
            {m.from === "me" && (
              <small className="message-edit-hint">Kliknij wiadomość, aby edytować</small>
            )}
          </div>
        ))}
      </div>

      <SettingsPanel />
      <MessageInput />
    </div>
  );
}
