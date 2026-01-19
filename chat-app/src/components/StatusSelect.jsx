import { useChatContext } from "../context/ChatContext";

export default function StatusSelect() {
    const { user, setUser } = useChatContext();

    const handleChange = (e) => {
        setUser({...user, status: e.target.value });
    };

    return (
        <select 
        className="status-select"
        value={user.status}
        onChange={(e) => setUser({ ...user, status: e.target.value })}>
            <option value = "Dostępny">Dostępny</option>
            <option value = "Zaraz wracam">Zaraz wracam</option>
            <option value = "Niedostępny">Niedostępny</option>
            <option value = "Nie przeszkadzać">Nie przeszkadzać</option>
        </select>
        
    );
    
}