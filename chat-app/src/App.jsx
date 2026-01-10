import { ChatProvider } from "./context/ChatContext";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Welcome from "./pages/Welcome";
import Chat from "./pages/Chat";
import PrivateRoute from "./routes/PrivateRoute";

export default function App() {
  return (
    <ChatProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Welcome />} />

          <Route
            path="/chat"
            element={
              <PrivateRoute>
                <Chat />
              </PrivateRoute>
            }
          />
        </Routes>
      </Router>
    </ChatProvider>
  );
}
