import { Route, Routes, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import PromptPage from "./pages/PromptPage";
import PromptHistoryPage from "./pages/PromptHistoryPage";
import AdminDashboardPage from "../src/pages/AdminDashboardPage";
import { useUserStore } from "./stores/useUserStore";


function App() {
  const isAdmin = useUserStore((state) => state.isAdmin);

  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/prompt" element={<PromptPage />} />
      <Route path="/history/:userId?" element={<PromptHistoryPage />} />
      <Route path="/admin" element={isAdmin ? <AdminDashboardPage /> : <Navigate to="/login" />} />

    </Routes>
  );
}

export default App;
