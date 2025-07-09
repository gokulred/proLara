import React, { createContext, useState, useEffect, useContext } from "react";
import apiClient from "../api/axios";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if the user is already authenticated when the app loads
    apiClient
      .get("/api/user")
      .then((response) => {
        setUser(response.data);
      })
      .catch(() => {
        setUser(null);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const login = async (credentials) => {
    await apiClient.get("/sanctum/csrf-cookie");
    await apiClient.post("/login", credentials);
    const response = await apiClient.get("/api/user");
    setUser(response.data);
  };

  const logout = async () => {
    await apiClient.post("/logout");
    setUser(null);
  };

  const auth = {
    user,
    isAuthenticated: !!user,
    isAdmin: user?.is_admin === 1,
    login,
    logout,
    loading,
  };

  return (
    <AuthContext.Provider value={auth}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

// Custom hook to easily use the auth context
export const useAuth = () => {
  return useContext(AuthContext);
};
