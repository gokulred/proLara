import React, { useState, useEffect } from "react";
import apiClient from "../api/axios";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export const AdminDashboard = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [filter, setFilter] = useState("pending"); // 'all' or 'pending'
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const params = filter === "pending" ? { status: "pending" } : {};
      const response = await apiClient.get("/api/admin/users", { params });
      setUsers(response.data);
    } catch (err) {
      setError("Failed to fetch users.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, [filter]); // Refetch when the filter changes

  const handleApprove = async (userId) => {
    try {
      await apiClient.post(`/api/admin/users/${userId}/approve`);
      fetchUsers(); // Refresh the list
    } catch (err) {
      alert("Failed to approve user.");
    }
  };

  const handleDelete = async (userId) => {
    if (
      window.confirm(
        "Are you sure you want to delete this user? This action cannot be undone."
      )
    ) {
      try {
        await apiClient.delete(`/api/admin/users/${userId}`);
        fetchUsers(); // Refresh the list
      } catch (err) {
        alert("Failed to delete user.");
      }
    }
  };

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <h1 className="text-2xl font-bold text-gray-800">
              Admin Dashboard
            </h1>
            <div className="flex items-center">
              <span className="text-gray-600 mr-4">Welcome, {user?.name}</span>
              <button
                onClick={handleLogout}
                className="bg-purple-600 text-white px-4 py-2 rounded-md hover:bg-purple-700"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold text-gray-700">
              User Management
            </h2>
            <div>
              <button
                onClick={() => setFilter("pending")}
                className={`px-4 py-2 rounded-l-md ${
                  filter === "pending"
                    ? "bg-purple-600 text-white"
                    : "bg-gray-200"
                }`}
              >
                Pending
              </button>
              <button
                onClick={() => setFilter("all")}
                className={`px-4 py-2 rounded-r-md ${
                  filter === "all" ? "bg-purple-600 text-white" : "bg-gray-200"
                }`}
              >
                All Users
              </button>
            </div>
          </div>

          {loading && <p>Loading users...</p>}
          {error && <p className="text-red-500">{error}</p>}

          {!loading && !error && (
            <div className="overflow-x-auto">
              <table className="min-w-full bg-white">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Contact Person
                    </th>
                    <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Email
                    </th>
                    <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      User Type
                    </th>
                    <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {users.map((u) => (
                    <tr key={u.id}>
                      <td className="py-4 px-4 whitespace-nowrap">
                        {u.contact_person}
                      </td>
                      <td className="py-4 px-4 whitespace-nowrap">{u.email}</td>
                      <td className="py-4 px-4 whitespace-nowrap">
                        {u.user_type}
                      </td>
                      <td className="py-4 px-4 whitespace-nowrap">
                        {u.approved_at ? (
                          <span className="bg-green-100 text-green-800 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded-full">
                            Approved
                          </span>
                        ) : (
                          <span className="bg-yellow-100 text-yellow-800 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded-full">
                            Pending
                          </span>
                        )}
                      </td>
                      <td className="py-4 px-4 whitespace-nowrap space-x-2">
                        {!u.approved_at && (
                          <button
                            onClick={() => handleApprove(u.id)}
                            className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600"
                          >
                            Approve
                          </button>
                        )}
                        <button
                          onClick={() => handleDelete(u.id)}
                          className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};
