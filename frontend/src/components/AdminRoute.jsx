import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const AdminRoute = () => {
  const { isAuthenticated, isAdmin } = useAuth();

  if (!isAuthenticated) {
    // If not logged in, redirect to login page
    return <Navigate to="/login" />;
  }

  if (!isAdmin) {
    // If logged in but not an admin, redirect to a generic user dashboard or an "unauthorized" page
    // For now, we'll just send them back to login
    return <Navigate to="/login" />;
  }

  // If authenticated and is an admin, render the child component (the AdminDashboard)
  return <Outlet />;
};

export default AdminRoute;
