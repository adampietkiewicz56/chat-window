import { useState } from "react";
import { useChatContext } from "../context/ChatContext";

export default function MessageInput() {
  const { currentContact, addMessage, addBotReply } = useChatContext();
  const [text, setText] = useState("");
  const [error, setError] = useState("");

  const emojis = ["😊", "😂", "❤️", "👍", "🔥"];

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

  return (
    <form onSubmit={send}>
      <div className="emojis">
        {emojis.map((emoji) => (
          <button
            type="button"
            key={emoji}
            className="emoji-btn"
            onClick={() => setText((prev) => prev + emoji)}
          >
            {emoji}
          </button>
        ))}
      </div>

      <div className="message-input-container">
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Napisz wiadomość..."
        />
        {error && <small className="error">{error}</small>}
        <button className="send-btn">Wyślij</button>
      </div>
    </form>
  );
}
