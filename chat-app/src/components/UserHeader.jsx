import { useChatContext } from "../context/ChatContext";
import StatusSelect from "./StatusSelect";


export default function UserHeader() {
  const { user, setUser } = useChatContext();

  return (
    <div className="user-header">
      <div className="avatar">{user.name[0]}</div>

      <div className="details">
        <strong>{user.name}</strong>
        <StatusSelect/>
      </div>
    </div>
  );
}