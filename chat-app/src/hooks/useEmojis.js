import { useState, useEffect } from 'react';

export const useEmojis = () => {
  const [emojis, setEmojis] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEmojis = async () => {
      setLoading(true);
      try {
        // Próba pobrania z API
        const response = await fetch('https://emoji-api.com/emojis?access_key=test');
        
        if (!response.ok) {
          throw new Error('API nie dostępne');
        }

        const data = await response.json();
        const emojiList = data.slice(0, 40).map((emoji) => ({
          emoji: emoji.emoji,
          name: emoji.name,
        }));
        setEmojis(emojiList);
      } catch (err) {
        // Fallback - popularne emoji
        const fallbackEmojis = [
          { emoji: '😀', name: 'grinning' },
          { emoji: '😂', name: 'joy' },
          { emoji: '❤️', name: 'heart' },
          { emoji: '🔥', name: 'fire' },
          { emoji: '👍', name: 'thumbsup' },
          { emoji: '😍', name: 'heart_eyes' },
          { emoji: '😭', name: 'cry' },
          { emoji: '🎉', name: 'tada' },
          { emoji: '😎', name: 'sunglasses' },
          { emoji: '🚀', name: 'rocket' },
          { emoji: '💯', name: 'hundred_points' },
          { emoji: '✨', name: 'sparkles' },
          { emoji: '🌟', name: 'star' },
          { emoji: '💬', name: 'speech_balloon' },
          { emoji: '👋', name: 'waving_hand' },
          { emoji: '🤔', name: 'thinking' },
          { emoji: '😴', name: 'sleeping' },
          { emoji: '😡', name: 'angry' },
          { emoji: '🎊', name: 'confetti_ball' },
          { emoji: '🎈', name: 'balloon' },
          { emoji: '🍕', name: 'pizza' },
          { emoji: '🎮', name: 'video_game' },
          { emoji: '⚡', name: 'zap' },
          { emoji: '🌈', name: 'rainbow' },
          { emoji: '🦄', name: 'unicorn' },
        ];
        setEmojis(fallbackEmojis);
        setError(null);
      } finally {
        setLoading(false);
      }
    };

    fetchEmojis();
  }, []);

  return { emojis, loading, error };
};
