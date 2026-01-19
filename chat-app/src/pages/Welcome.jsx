import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../hooks/useUser";

export default function Welcome() {
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { user, setUserData } = useUser();

  useEffect(() => {
    if (user) {
      navigate("/chat");
    }
  }, [user, navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim()) {
      setError("Musisz podać nazwę użytkownika.");
      return;
    }

    const trimmedName = name.trim();
    setUserData(trimmedName, "Dostępny");
    navigate("/chat");
  };

  return (
    <div className="welcome-page">
      <div className="welcome-card">
        <h1>Wybierz swoją nazwę użytkownika</h1>

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Twoje imię..."
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          {error && <p className="error">{error}</p>}
          <button type="submit">Start</button>
        </form>
      </div>
    </div>
  );
}
