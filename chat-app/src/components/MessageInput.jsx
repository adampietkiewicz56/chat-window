import { useState } from "react";
import { useChatContext } from "../context/ChatContext";

export default function MessageInput() {
  const { currentContact, addMessage, addBotReply } = useChatContext();
  const [text, setText] = useState("");

  const emojis = ["😀", "😂", "😎", "❤️", "👍"];

  const send = (e) => {
    e.preventDefault();
    if (!text.trim()) return;
    addMessage(currentContact, text);
    addBotReply(currentContact);
    setText("");
  };

  const addEmoji = (emoji) => {
    setText((prev) => prev + emoji);
  };

  return (
    <form onSubmit={send} style={{ display: "flex", flexDirection: "column" }}>
      <div style={{ marginBottom: "5px" }}>
        {emojis.map((emoji) => (
          <button
            type="button"
            key={emoji}
            onClick={() => addEmoji(emoji)}
            style={{ marginRight: "5px" }}
          >
            {emoji}
          </button>
        ))}
      </div>

      <div style={{ display: "flex" }}>
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Napisz wiadomość..."
          style={{ flex: 1 }}
        />
        <button type="submit">Wyślij</button>
      </div>
    </form>
  );
}