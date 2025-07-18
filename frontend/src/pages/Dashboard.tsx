import { useNavigate } from "react-router-dom";
import { useUserStore } from "../stores/useUserStore";

export default function Dashboard() {
  const navigate = useNavigate();
  const { user, logout } = useUserStore();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-blue-100 to-white">
      {/* Top Bar */}
      <header className="h-20 flex items-center justify-between bg-white shadow px-6 py-4">
        <div className="flex items-center gap-3">
          <img src="/logo.svg" alt="AI Learning Logo" className="w-10 h-10" />
          <span className="text-xl font-bold text-blue-700">AI Learning</span>
        </div>

        <div className="flex items-center gap-4">
          {user && (
            <span className="text-gray-700 font-medium hidden sm:block">
              Hello, <span className="text-blue-700 font-semibold">{user.name}</span>
            </span>
          )}

          <button
            onClick={handleLogout}
            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md transition"
          >
            Logout
          </button>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex-grow flex items-center justify-center">
        <div className="w-full max-w-2xl mx-auto bg-white rounded-2xl shadow-2xl p-10 text-center space-y-8">
          <h1 className="text-4xl font-extrabold text-blue-700">
            Welcome, {user?.name} 👋
          </h1>
          <p className="text-gray-600 text-lg max-w-md mx-auto">
            Manage your learning journey with ease. Start a new prompt, view your history.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-6">
            <button
              onClick={() => navigate("/prompt")}
              className="bg-blue-600 hover:bg-blue-700 text-white text-lg font-semibold py-4 px-6 rounded-xl shadow-lg hover:scale-105 transition-all"
            >
              Start New Prompt 🚀
            </button>

            <button
              onClick={() => navigate("/history")}
              className="bg-gray-200 hover:bg-gray-300 text-gray-800 text-lg font-semibold py-4 px-6 rounded-xl shadow-lg hover:scale-105 transition-all"
            >
              View History 📚
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
