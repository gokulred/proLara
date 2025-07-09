import React, { useState } from "react";

import apiClient, { getCsrfCookie } from "../api/axios";

export const Login = () => {
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      // This line is essential and must come first!
      await getCsrfCookie();

      // Now you can call the login function from your context
      await login(credentials);

      // Navigate to the dashboard after successful login
      navigate("/admin/dashboard");
    } catch (err) {
      const message = err.response?.data?.message || "Invalid credentials.";
      setError(message);
    }
  };
  return (
    <div className="bg-gray-100 flex items-center justify-center min-h-screen">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-3xl font-bold mb-2 text-gray-800">Log In</h2>
        <p className="text-gray-600 mb-6">
          New user?{" "}
          <a href="/signup" className="text-purple-600 hover:underline">
            Create an account
          </a>
        </p>

        {error && (
          <p className="bg-red-100 text-red-700 p-3 rounded-md mb-4">{error}</p>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={credentials.email}
            onChange={handleChange}
            className="w-full p-3 border rounded-md"
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={credentials.password}
            onChange={handleChange}
            className="w-full p-3 border rounded-md"
            required
          />

          <div className="flex justify-between items-center">
            <a href="#" className="text-sm text-purple-600 hover:underline">
              Forgot Password?
            </a>
          </div>

          <button
            type="submit"
            className="w-full bg-purple-600 text-white p-3 rounded-md font-bold hover:bg-purple-700 transition-colors"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};
