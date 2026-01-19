import "./App.css";
import { Suspense } from "react";
import { RouterProvider } from "react-router";
import routes from "./routes";
import ChatAssistant from "./components/shared/ChatAssistant";
import { ToastProvider } from "./contexts/ToastContext";
import { AuthProvider } from "./contexts/AuthContext";

function App() {
  return (
    <AuthProvider>
      <ToastProvider>
        <Suspense
          fallback={
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-linear-to-br from-white via-yellow-50 to-yellow-100">
              {/* Animated background elements */}
              <div className="absolute inset-0 overflow-hidden">
                <div className="absolute -top-40 -left-40 w-80 h-80 bg-yellow-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse"></div>
                <div className="absolute top-40 -right-40 w-80 h-80 bg-yellow-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse animation-delay-2000"></div>
                <div className="absolute -bottom-40 left-1/2 w-80 h-80 bg-yellow-400 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse animation-delay-4000"></div>
              </div>

              {/* Main loader content */}
              <div className="relative flex flex-col items-center gap-8 px-4">
                {/* Logo/Brand */}
                <div className="relative">
                  <div className="absolute inset-0 bg-yellow-400 rounded-full blur-2xl opacity-40 animate-pulse"></div>
                  <div className="relative bg-linear-to-br from-yellow-400 to-yellow-500 rounded-3xl p-8 shadow-2xl transform hover:scale-105 transition-transform">
                    <span className="text-5xl font-bold text-black font-serif tracking-tight">
                      imagic
                    </span>
                  </div>
                </div>

                {/* Spinner */}
                <div className="relative">
                  <div className="w-20 h-20 border-4 border-yellow-200 rounded-full"></div>
                  <div className="absolute top-0 left-0 w-20 h-20 border-4 border-yellow-400 border-t-transparent rounded-full animate-spin"></div>
                </div>

                {/* Loading text */}
                <div className="flex flex-col items-center gap-2">
                  <p className="text-xl font-semibold text-gray-800 tracking-wide">
                    Loading your experience
                  </p>
                  <div className="flex gap-1.5">
                    <span className="w-2 h-2 bg-yellow-400 rounded-full animate-bounce"></span>
                    <span className="w-2 h-2 bg-yellow-400 rounded-full animate-bounce animation-delay-200"></span>
                    <span className="w-2 h-2 bg-yellow-400 rounded-full animate-bounce animation-delay-400"></span>
                  </div>
                </div>

                {/* Tagline */}
                <p className="text-sm text-gray-600 font-medium mt-2">
                  Your journey to creativity starts here
                </p>
              </div>
            </div>
          }
        >
          <RouterProvider router={routes} />
        </Suspense>
        <ChatAssistant />
      </ToastProvider>
    </AuthProvider>
  );
}

export default App;
