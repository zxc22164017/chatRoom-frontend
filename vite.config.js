import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { compression } from "vite-plugin-compression2";

// https://vitejs.dev/config//
export default defineConfig({
  base: "/",
  plugins: [react(), compression({ threshold: 50000, algorithm: "gzip" })],
  preview: {
    port: 5173,
    strictPort: true,
  },
  server: {
    port: 5173,
    strictPort: true,
    host: true,
    origin: "http://localhost:5173",
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: (id) => {
          console.log(id);
          if (id.includes("node_modules")) {
            const arr = id.toString().split("node_modules/")[1].split("/");
            switch (arr[0]) {
              case "element-plus":
                return;
              default:
                return arr[0];
            }
          }
        },
      },
    },
  },
});
