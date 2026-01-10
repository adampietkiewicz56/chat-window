import { useChatContext } from "../context/ChatContext";
import StatusSelect from "./StatusSelect";


export default function UserHeader() {
  const { user } = useChatContext();

  const logout = () => {
    localStorage.removeItem("username");
    window.location.reload();
  };

  return (
    <div className="user-header">
      <div className="avatar">{user.name[0]}</div>

      <div className="details">
        <strong>{user.name}</strong>
        <StatusSelect/>
        <button onClick={logout} className="logout-btn">
          Wyloguj
        </button>
      </div>
    </div>
  );
}