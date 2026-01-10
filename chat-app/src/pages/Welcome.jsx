import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useChatContext } from "../context/ChatContext";

export default function Welcome() {
  const [name, setName] = useState("");
  const navigate = useNavigate();
  const { setUser } = useChatContext();

  useEffect(() => {
    const savedName = localStorage.getItem("username");
    if (savedName) {
      // 🔹 jeżeli ktoś odświeży stronę
      setUser({ name: savedName, status: "Dostępny" });
      navigate("/chat");
    }
  }, [navigate, setUser]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim()) return;

    const trimmedName = name.trim();

    // 🔹 zapis trwały
    localStorage.setItem("username", trimmedName);

    // 🔹 zapis do stanu aplikacji (KLUCZ!)
    setUser({ name: trimmedName, status: "Dostępny" });

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
            <button type="submit">Start</button>
        </form>
        </div>
    </div>
    );
}
