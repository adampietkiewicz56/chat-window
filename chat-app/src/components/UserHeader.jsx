import { useChatContext } from "../context/ChatContext";

export default function UserHeader() {
  const { user, setUser } = useChatContext();

  return (
    <div className="user-header">
      <div className="avatar">{user.name[0]}</div>

      <div className="details">
        <strong>{user.name}</strong>
        <select
          className="status-select"
          value={user.status}
          onChange={(e) => setUser({ ...user, status: e.target.value })}
        >
          <option value="Dostępny">Dostępny</option>
          <option value="Zaraz wracam">Zaraz wracam</option>
        </select>
      </div>
    </div>
  );
}