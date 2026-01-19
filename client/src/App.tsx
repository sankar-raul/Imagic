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
            <div className="fixed inset-0 z-50 bg-white overflow-y-auto">
              {/* Header Skeleton */}
              <div className="sticky top-0 bg-white shadow-sm z-40">
                <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
                  <div className="w-32 h-12 bg-gray-200 rounded-lg animate-pulse"></div>
                  <div className="hidden md:flex gap-6">
                    <div className="w-20 h-8 bg-gray-200 rounded animate-pulse"></div>
                    <div className="w-20 h-8 bg-gray-200 rounded animate-pulse"></div>
                    <div className="w-20 h-8 bg-gray-200 rounded animate-pulse"></div>
                    <div className="w-20 h-8 bg-gray-200 rounded animate-pulse"></div>
                  </div>
                  <div className="flex gap-3">
                    <div className="w-10 h-10 bg-gray-200 rounded-full animate-pulse"></div>
                    <div className="w-10 h-10 bg-gray-200 rounded-full animate-pulse"></div>
                  </div>
                </div>
              </div>

              {/* Hero Section Skeleton */}
              <div className="max-w-7xl mx-auto px-4 py-12">
                <div className="h-96 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 rounded-3xl animate-pulse"></div>
              </div>

              {/* Content Section Skeleton */}
              <div className="max-w-7xl mx-auto px-4 py-8">
                {/* Section Title */}
                <div className="text-center mb-12">
                  <div className="h-12 w-2/3 mx-auto bg-gray-200 rounded-lg animate-pulse mb-4"></div>
                  <div className="h-4 w-3/4 mx-auto bg-gray-200 rounded animate-pulse"></div>
                  <div className="h-4 w-2/3 mx-auto bg-gray-200 rounded animate-pulse mt-2"></div>
                </div>

                {/* Cards Grid */}
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
                  {[1, 2, 3, 4, 5, 6].map((i) => (
                    <div
                      key={i}
                      className="rounded-3xl overflow-hidden shadow-lg"
                    >
                      <div className="h-64 bg-gradient-to-br from-gray-200 via-gray-100 to-gray-200 animate-pulse"></div>
                      <div className="p-6 space-y-4">
                        <div className="flex gap-2">
                          <div className="w-20 h-7 bg-gray-200 rounded-2xl animate-pulse"></div>
                          <div className="w-24 h-7 bg-gray-200 rounded-2xl animate-pulse"></div>
                        </div>
                        <div className="h-6 bg-gray-200 rounded animate-pulse"></div>
                        <div className="h-6 w-3/4 bg-gray-200 rounded animate-pulse"></div>
                        <div className="space-y-2">
                          <div className="h-3 bg-gray-200 rounded animate-pulse"></div>
                          <div className="h-3 bg-gray-200 rounded animate-pulse"></div>
                          <div className="h-3 w-2/3 bg-gray-200 rounded animate-pulse"></div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Loading indicator */}
              <div className="fixed bottom-8 right-8 bg-yellow-400 text-black px-6 py-3 rounded-full shadow-lg flex items-center gap-3 animate-pulse">
                <div className="w-5 h-5 border-3 border-black border-t-transparent rounded-full animate-spin"></div>
                <span className="font-semibold">Loading...</span>
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
