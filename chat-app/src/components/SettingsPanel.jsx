import { useChatContext } from "../context/ChatContext";

export default function SettingsPanel() {
    const { settings, setSettings } = useChatContext();

    const toggleShowTime = () => {
        setSettings({ ...settings, showTime: !settings.showTime });
    };

    return (
        <div style={{ marginBottom: "10px" }}>
            <label>
                <input 
                    type="checkbox"
                    checked={settings.showTime}
                    onChange={toggleShowTime}
                />
                Pokaż godzinę wysłania
            </label>
        </div>
    )
}