import { useState } from 'react';
import { useEmojis } from '../hooks/useEmojis';

export default function EmojiPicker({ onEmojiSelect }) {
  const [isOpen, setIsOpen] = useState(false);
  const { emojis, loading } = useEmojis();

  const handleEmojiClick = (emoji) => {
    if (onEmojiSelect) {
      onEmojiSelect(emoji);
    }
    setIsOpen(false);
  };

  return (
    <div className="emoji-picker">
      <button
        type="button"
        className="emoji-picker__toggle"
        onClick={() => setIsOpen(!isOpen)}
        title="Otwórz selektor emoji"
      >
        😊
      </button>

      {isOpen && (
        <div className="emoji-picker__dropdown">
          {loading && <p className="emoji-picker__status">Ładowanie emoji...</p>}

          <div className="emoji-picker__grid">
            {emojis.map((item, index) => (
              <button
                key={index}
                type="button"
                className="emoji-picker__emoji"
                onClick={() => handleEmojiClick(item.emoji)}
                title={item.name}
              >
                {item.emoji}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
