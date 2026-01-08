import ContactList from "../components/ContactList";
import Conversation from "../components/Conversation";
import UserHeader from "../components/UserHeader";

export default function Chat() {
  return (
    <div className="chat-container">
      <UserHeader />
      <div className="chat-content">
        <div className="sidebar">
          <ContactList />
        </div>
        <div className="chat-panel">
          <Conversation />
        </div>
      </div>
    </div>
  );
}