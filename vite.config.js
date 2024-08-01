import path from "path";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import { fileURLToPath } from "url";
import { dirname } from "path";

/**
 * Get the directory name from the importMetaUrl.
 * @param {string} importMetaUrl - The importMetaUrl.
 * @returns {string} The directory name.
 */
function getDirname(importMetaUrl) {
  const filename = fileURLToPath(importMetaUrl);
  return dirname(filename);
}
const __dirname = getDirname(import.meta.url);

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
