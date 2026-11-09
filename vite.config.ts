import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

export default defineConfig({
  plugins: [react()],
  base: process.env.GITHUB_PAGES_BASE || "/meredith-and-gideon-s-wedding-site/",
  resolve: { alias: { "@": path.resolve(__dirname, "./src") } },
});
