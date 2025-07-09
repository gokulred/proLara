import { SignUp } from "./components/SignUp";
import { Login } from "./components/Login";
import AdminRoute from "./components/AdminRoute";
import { AdminDashboard } from "./components/AdminDashboard";
import { Routes, Route } from "react-router-dom";
import { UserDashboard } from "./components/UserDashboard";

function App() {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/signup" element={<SignUp />} />
      <Route path="/login" element={<Login />} />
      <Route path="/" element={<Login />} />

      {/* Protected Admin Route */}
      <Route element={<AdminRoute />}>
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
      </Route>

      {/* Protected Regular User Route */}
      <Route path="/dashboard" element={<UserDashboard />} />
    </Routes>
  );
}

export default App;
