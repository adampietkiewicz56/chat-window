import { useChatContext } from "../context/ChatContext";

export default function StatusSelect() {
    const { user, setUser } = useChatContext();

    const handleChange = (e) => {
        setUser({...user, status: e.target.value });
    };

    return (
        <select value={user.status} onChange={handleChange}>
            <option value = "Dostępny">Dostępny</option>
            <option value = "Zaraz wracam">Zaraz wracam</option>
            <option value = "Niedostępny">Niedostępny</option>
            <option value = "Nie przeszkadzać">Nie przeszkadzać</option>
        </select>
    );
}