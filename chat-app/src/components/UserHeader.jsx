import { useUser } from "../hooks/useUser";
import StatusSelect from "./StatusSelect";

export default function UserHeader() {
  const { user, logout } = useUser();

  if (!user) return null;

  return (
    <div className="user-header">
      <div className="avatar">{user.initials}</div>

      <div className="details">
        <strong>{user.name}</strong>
        <StatusSelect />
        <button onClick={logout} className="logout-btn">
          Wyloguj
        </button>
      </div>
    </div>
  );
}