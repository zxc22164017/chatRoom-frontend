import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { compression } from "vite-plugin-compression2";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), compression({ threshold: 50000, algorithm: "gzip" })],
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
