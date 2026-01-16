import "./App.css";

import { RouterProvider } from "react-router";
import routes from "./routes";
import ChatAssistant from "./components/shared/ChatAssistant";
import { ToastProvider } from "./contexts/ToastContext";

function App() {
  return (
    <ToastProvider>
      <RouterProvider router={routes} />
      <ChatAssistant />
    </ToastProvider>
  );
}

export default App;
