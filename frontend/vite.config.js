import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    proxy: {
      // Proxy API requests to your Laravel backend
      "/api": {
        target: "http://back-api.test",
        changeOrigin: true,
        secure: false,
      },
      // Also proxy the Sanctum CSRF cookie route
      "/sanctum": {
        target: "http://back-api.test",
        changeOrigin: true,
        secure: false,
      },
    },
  },
});
