import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  resolve: {
    alias: {
      "@": "/src", // Ensure this alias is correct
    },
  },
  plugins: [react()],
  build: {
    outDir: "dist", // Output directory for the build
    sourcemap: true, // Generate source maps for debugging
    rollupOptions: {
      // Rollup options if needed
      input: "/index.html", // Entry point for the application
    },
  },
});
