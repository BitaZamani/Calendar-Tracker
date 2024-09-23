import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
export default defineConfig({
  base: "/Calendar-Tracker/",
  plugins: [react()],
});
