import { useState } from "react";
import { useUserStore } from "../../stores/useUserStore";
import { useNavigate } from "react-router-dom";
import UserManager from "./UserManager";
import CategoryManager from "./CategoryManager";
import PromptManager from "./PromptManager";
import { LogOut } from "lucide-react";

const TABS = ["Users", "Categories", "Prompts"] as const;
type TabType = typeof TABS[number];

export default function AdminDashboardPage() {
  const { user, logout } = useUserStore();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<TabType>("Users");

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const renderTab = () => {
    switch (activeTab) {
      case "Users":
        return <UserManager />;
      case "Categories":
        return <CategoryManager />;
      case "Prompts":
        return <PromptManager />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-tr from-white to-yellow-50 text-gray-800">
      {/* Header */}
      <header className="h-20 px-10 flex items-center justify-between bg-white shadow-md border-b border-gray-200">
        <div className="flex items-center gap-4">
          <img src="/logo.svg" alt="Logo" className="w-10 h-10" />
          <h1 className="text-2xl font-semibold text-yellow-600 tracking-tight">
            AI Admin Panel
          </h1>
        </div>
        <div className="flex items-center gap-4">
          <span className="text-sm text-gray-500">{user?.name} (Admin)</span>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 bg-red-100 hover:bg-red-200 text-red-600 px-4 py-2 rounded-xl transition"
          >
            <LogOut size={18} />
            Logout
          </button>
        </div>
      </header>

      {/* Tabs */}
      <section className="px-10 pt-8">
        <div className="flex gap-3 mb-6">
          {TABS.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-5 py-2 rounded-full text-sm font-medium transition border shadow-sm
                ${
                  activeTab === tab
                    ? "bg-yellow-500 text-white"
                    : "bg-white text-gray-600 hover:bg-yellow-100"
                }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="bg-white rounded-2xl shadow-xl p-6 border border-gray-100">
          {renderTab()}
        </div>
      </section>
    </div>
  );
}
