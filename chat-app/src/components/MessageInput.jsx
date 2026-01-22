import { useState } from "react";
import { useChatContext } from "../context/ChatContext";
import EmojiPicker from "./EmojiPicker";

export default function MessageInput() {
  const { currentContact, addMessage, addBotReply } = useChatContext();
  const [text, setText] = useState("");
  const [error, setError] = useState("");

  const send = (e) => {
    e.preventDefault();
    if (!text.trim()) {
      setError("Nie możesz wysłać pustej wiadomości")
      return;
    }

    addMessage(currentContact, text);
    addBotReply(currentContact);
    setError("");
    setText("");
  };

  const handleEmojiSelect = (emoji) => {
    setText((prev) => prev + emoji);
  };

  return (
    <form className="message-input-form" onSubmit={send}>
      <div className="message-input-container">
        <EmojiPicker onEmojiSelect={handleEmojiSelect} />
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Napisz wiadomość..."
        />
        <button className="send-btn">Wyślij</button>
      </div>
      {error && <small className="error">{error}</small>}
    </form>
  );
}
