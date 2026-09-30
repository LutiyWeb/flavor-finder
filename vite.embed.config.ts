import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [react()],
  publicDir: false,
  define: { "process.env.NODE_ENV": JSON.stringify("production") },
  build: {
    outDir: "release",
    emptyOutDir: true,
    lib: {
      entry: "src/embed.tsx",
      name: "FlavorFinder",
      formats: ["iife"],
      fileName: () => "flavor-finder.js",
    },
  },
});
