import { Navigate } from "react-router-dom";
import { useChatContext } from "../context/ChatContext";

export default function PrivateRoute({ children }) {
  const { user } = useChatContext();

  if (!user) {
    return <Navigate to="/" replace />;
  }

  return children;
}
