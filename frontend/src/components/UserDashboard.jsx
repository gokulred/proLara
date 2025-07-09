// frontend/src/components/UserDashboard.jsx

import React from "react";
import { useAuth } from "../context/AuthContext";

export const UserDashboard = () => {
  const { user, logout } = useAuth();

  return (
    <div>
      <h1>Welcome, {user?.name}!</h1>
      <p>This is your dashboard.</p>
      <button onClick={logout}>Logout</button>
    </div>
  );
};
