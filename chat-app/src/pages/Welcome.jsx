import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"

export default function Welcome() {
    const [name, setName] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        const savedName = localStorage.getItem("username");
        if (savedName) {
            navigate("/chat");
        }
    }, [navigate]);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!name.trim()) return;
        localStorage.setItem("username", name.trim());
        navigate("/chat");
    };


    return (
        <div>
            <h1>Podaj swoje imię</h1>
            <form onSubmit={handleSubmit}>
                <input
                    type = "text"
                    placeholder="Twoje imię..."
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
                <button type="submit">Start</button>
            </form>
        </div>
    );
}

