import { Route, Routes, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import PromptPage from "./pages/PromptPage";
// import PromptHistoryPage from "./pages/PromptHistoryPage";


function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/prompt" element={<PromptPage />} />
      {/* <Route path="/history" element={<PromptHistoryPage />} /> */}

    </Routes>
  );
}

export default App;
