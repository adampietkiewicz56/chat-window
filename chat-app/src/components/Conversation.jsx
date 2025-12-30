import MessageInput from "./MessageInput";
import { useState } from "react";
import { useChatContext } from "../context/ChatContext";
import StatusSelect from "./StatusSelect";
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
    <div>
      <h3 style = {{display: "flex", justifyContent: "space-between"}}>
        <span>Rozmowa z: ${contact?.name}</span>
        <StatusSelect />
      </h3>
      <div style={{ height: "80vh", overflowY: "auto", border: "1px solid #ccc" }}>
        {msgs.map((m, index) => (
          <div
            key={index}
            style={{ textAlign: m.from === "me" ? "right" : "left", marginBottom: "8px" }}
          >
            {editIndex === index && m.from === "me" ? (
              <>
                <input
                  type="text"
                  value={editText}
                  onChange={(e) => setEditText(e.target.value)}
                />
                <button onClick={() => saveEdit(index)}>OK</button>
              </>
            ) : (
              <span
                onClick={() => m.from === "me" && handleEdit(index, m.text)}
                style={{ cursor: m.from === "me" ? "pointer" : "default" }}
              >
                {m.text}
              </span>
            )}

            {settings.showTime && <small> {m.time}</small>}
            {m.edited && <small> (edytowano)</small>}
          </div>
        ))}
      </div>
      <SettingsPanel />
    
      <MessageInput />
    </div>
  );
}