import { useChatContext } from "../context/ChatContext";

export default function SettingsPanel() {
  const { settings, setSettings } = useChatContext();

  return (
    <div className="settings-toggle">
      <input
        type="checkbox"
        checked={settings.showTime}
        onChange={(e) =>
          setSettings({ ...settings, showTime: e.target.checked })
        }
      />
      <label>Pokaż godzinę wysłania</label>
    </div>
  );
}
