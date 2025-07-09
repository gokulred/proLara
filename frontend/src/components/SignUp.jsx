import React, { useState } from "react";
import apiClient, { getCsrfCookie } from "../api/axios";

const USER_TYPES = [
  "Individual",
  "Private Business",
  "Organisation",
  "Company",
  "Institution",
];

export const SignUp = () => {
  const [formData, setFormData] = useState({
    user_type: "Institution",
    institution_name: "",
    street: "",
    city: "",
    state: "",
    zip_code: "",
    contact_person: "",
    phone: "",
    email: "",
    password: "",
    password_confirmation: "",
  });

  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccessMessage("");

    // Basic frontend validation for password confirmation
    if (formData.password !== formData.password_confirmation) {
      setError("Passwords do not match.");
      return;
    }

    try {
      await getCsrfCookie();
      await apiClient.post("/register", formData);
      setSuccessMessage(
        "Registration successful! Please wait for admin approval."
      );
      // Optionally clear the form
      // setFormData({ ...initial state... });
    } catch (err) {
      if (err.response && err.response.data && err.response.data.errors) {
        // Format Laravel validation errors
        const errorMessages = Object.values(err.response.data.errors)
          .flat()
          .join(" ");
        setError(errorMessages);
      } else {
        setError("An unexpected error occurred. Please try again.");
      }
    }
  };

  return (
    <div className="bg-gray-100 flex items-center justify-center min-h-screen py-12">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-4xl">
        <h2 className="text-3xl font-bold mb-2 text-gray-800">Sign Up</h2>
        <p className="text-gray-600 mb-6">
          Already have an account?{" "}
          <a href="/login" className="text-purple-600 hover:underline">
            Log In
          </a>
        </p>

        {error && (
          <div className="bg-red-100 text-red-700 p-3 rounded-md mb-4">
            {error}
          </div>
        )}
        {successMessage && (
          <div className="bg-green-100 text-green-700 p-3 rounded-md mb-4">
            {successMessage}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <select
            name="user_type"
            value={formData.user_type}
            onChange={handleChange}
            className="w-full p-3 border rounded-md bg-white"
          >
            {USER_TYPES.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>

          <fieldset className="border p-4 rounded-md">
            <legend className="text-lg font-semibold px-2 text-gray-700">
              Your Contact Details
            </legend>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
              <input
                type="text"
                name="institution_name"
                placeholder=" Name"
                value={formData.institution_name}
                onChange={handleChange}
                className="p-3 border rounded-md w-full col-span-1 md:col-span-2"
              />
              <input
                type="text"
                name="street"
                placeholder="Street"
                value={formData.street}
                onChange={handleChange}
                className="p-3 border rounded-md"
              />
              <input
                type="text"
                name="city"
                placeholder="City"
                value={formData.city}
                onChange={handleChange}
                className="p-3 border rounded-md"
              />
              <input
                type="text"
                name="state"
                placeholder="State"
                value={formData.state}
                onChange={handleChange}
                className="p-3 border rounded-md"
              />
              <input
                type="text"
                name="zip_code"
                placeholder="Zip Code"
                value={formData.zip_code}
                onChange={handleChange}
                className="p-3 border rounded-md"
              />
              <input
                type="text"
                name="contact_person"
                placeholder="Name of Contact Person"
                value={formData.contact_person}
                onChange={handleChange}
                className="p-3 border rounded-md"
                required
              />
              <input
                type="tel"
                name="phone"
                placeholder="Phone"
                value={formData.phone}
                onChange={handleChange}
                className="p-3 border rounded-md"
              />
            </div>
          </fieldset>

          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={formData.email}
            onChange={handleChange}
            className="w-full p-3 border rounded-md"
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            className="w-full p-3 border rounded-md"
            required
          />
          <input
            type="password"
            name="password_confirmation"
            placeholder="Confirm Password"
            value={formData.password_confirmation}
            onChange={handleChange}
            className="w-full p-3 border rounded-md"
            required
          />

          <div className="flex items-center">
            <input type="checkbox" id="terms" className="mr-2" required />
            <label htmlFor="terms" className="text-gray-600">
              I agree to all statements in the{" "}
              <a href="#" className="text-purple-600">
                Terms of Service
              </a>
            </label>
          </div>

          <button
            type="submit"
            className="w-full bg-purple-600 text-white p-3 rounded-md font-bold hover:bg-purple-700 transition-colors"
          >
            Create Account
          </button>
        </form>
      </div>
    </div>
  );
};
