import { useUser } from "../hooks/useUser";

export default function StatusSelect() {
  const { user, setUserData } = useUser();

  const handleChange = (e) => {
    if (user) {
      setUserData(user.name, e.target.value);
    }
  };

  if (!user) return null;

  return (
    <select 
      className="status-select"
      value={user.status}
      onChange={handleChange}
    >
      <option value="Dostępny">Dostępny</option>
      <option value="Zaraz wracam">Zaraz wracam</option>
      <option value="Niedostępny">Niedostępny</option>
      <option value="Nie przeszkadzać">Nie przeszkadzać</option>
    </select>
  );
}