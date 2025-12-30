import MessageInput from "./MessageInput";
import { useChatContext } from "../context/ChatContext";

export default function Conversation() {
  const { contacts, currentContact, messages, settings } = useChatContext();
  const msgs = messages[currentContact] || [];
  const contact = contacts.find(c => c.id === currentContact);

  return (
    <div>
      <h3>Rozmowa z: {contact?.name}</h3>
      <div style={{ height: "80vh", overflowY: "auto", border: "1px solid #ccc" }}>
        {msgs.map((m, index) => (
          <div key={index} style={{ textAlign: m.from === "me" ? "right" : "left" }}>
            <span>{m.text}</span>
            {settings.showTime && <small> {m.time}</small>}
            {m.edited && <small> (edytowano)</small>}
          </div>
        ))}
      </div>
      <MessageInput />
    </div>
  );
}