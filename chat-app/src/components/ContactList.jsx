import { useState } from "react";
import { useChatContext } from "../context/ChatContext";


export default function ContactList() {
    const { contacts, currentContact, setCurrentContact, addContact } = useChatContext();
    const [newContact, setNewContact] = useState("");

    const handleAdd = (e) => {
        e.preventDefault();
        if (!newContact.trim()) return;
        addContact(newContact);
        setNewContact("");
    };

    return (
        <div>
            <h3>Kontakty</h3>
            <ul>
                {contacts.map((c) => (
                    <li
                        key={c.id}
                        style={{
                            cursor: "pointer",
                            background: c.id === currentContact ? "#eee" : "transparent",
                        }}
                        onClick={() => setCurrentContact(c.id)}
                    >
                        {c.name}
                    </li>
                ))}
            </ul>

            <form onSubmit={handleAdd}>
                <input
                    type="text"
                    placeholder="Dodaj kontakt"
                    value={newContact}
                    onChange={(e) => setNewContact(e.target.value)}
                />
                <button type="submit">+</button>
            </form>
        </div>
    );
}