import { useState } from "react";
import { useChatContext } from "../context/ChatContext";

export default function MessageInput() {
  const { currentContact, addMessage, addBotReply } = useChatContext();
  const [text, setText] = useState("");

  const emojis = ["😊", "😂", "❤️", "👍", "🔥"];

  const send = (e) => {
    e.preventDefault();
    if (!text.trim()) return;

    addMessage(currentContact, text);
    addBotReply(currentContact);

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
        <button className="send-btn">Wyślij</button>
      </div>
    </form>
  );
}
