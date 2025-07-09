import axios from "axios";

// Create an Axios instance with a pre-configured setup
const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
});

/**
 * A helper function to make the initial request to Sanctum's CSRF endpoint.
 * You must call this before any POST/PUT/DELETE requests (like login or register).
 */
export const getCsrfCookie = () => apiClient.get("/sanctum/csrf-cookie");

// Export the configured instance to be used throughout your app
export default apiClient;
