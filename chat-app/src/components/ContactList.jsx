import { useState } from "react";
import { useChatContext } from "../context/ChatContext";

export default function ContactList() {
  const { contacts, currentContact, setCurrentContact, addContact } =
    useChatContext();
  const [newContact, setNewContact] = useState("");

  const handleAdd = (e) => {
    e.preventDefault();
    if (!newContact.trim()) return;
    addContact(newContact);
    setNewContact("");
  };

  return (
    <div className="contact-sidebar">
      <h3 className="contact-title">Kontakty</h3>

      <ul className="contact-list">
        {contacts.map((c) => (
          <li
            key={c.id}
            className={`contact-item ${
              c.id === currentContact ? "active" : ""
            }`}
            onClick={() => setCurrentContact(c.id)}
          >
            <div className="contact-avatar">
              {c.name.charAt(0).toUpperCase()}
            </div>
            <span className="contact-name">{c.name}</span>
          </li>
        ))}
      </ul>

      <form className="add-contact-form" onSubmit={handleAdd}>
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
