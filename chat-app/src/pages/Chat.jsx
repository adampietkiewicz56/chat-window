import ContactList from "../components/ContactList"
import Conversation from "../components/Conversation"

export default function Chat() {
    return (
        <div style={{display: "flex", height: "100vh"}}>
            <div style={{width: "30%", borderRight: "1px solid #ccc" }}>
                <ContactList />
            </div>
            <div style={{ width: "70%" }}>
                <Conversation />
            </div>
        </div>
    );
}