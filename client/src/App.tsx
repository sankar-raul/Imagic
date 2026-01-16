import "./App.css";

import { RouterProvider } from "react-router";
import routes from "./routes";
import ChatAssistant from "./components/shared/ChatAssistant";
import { ToastProvider } from "./contexts/ToastContext";
import { AuthProvider } from "./contexts/AuthContext";

function App() {
  return (
    <AuthProvider>
      <ToastProvider>
        <RouterProvider router={routes} />
        <ChatAssistant />
      </ToastProvider>
    </AuthProvider>
  );
}

export default App;
