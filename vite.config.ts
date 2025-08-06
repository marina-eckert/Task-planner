import { defineConfig } from "vite";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import dotenv from "dotenv";

// https://vite.dev/config/
//export default defineConfig({
//  plugins: [react(), tailwindcss()],
//  server: {
//    proxy: {
//     "/api": {
//       target: "http://localhost:5000",
//       changeOrigin: true,
//       secure: false,
//     },
//    },
//  },
//});
dotenv.config(); // загрузить .env в process.env

const API_BASE_URL =
  process.env.VITE_API_BASE_URL || "http://localhost:5000/api";

export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    proxy: {
      "/api": {
        target: API_BASE_URL.replace(/\/api$/, ""),
        changeOrigin: true,
        secure: false,
      },
    },
  },
});
