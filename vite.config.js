import { fileURLToPath, URL } from "node:url";

import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

// https://vitejs.dev/config/
export default defineConfig({
  base: '/vcontact/',
  plugins: [vue()],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
  assetsDir: "assets",
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@import "./src/assets/styles/sass/_variables.scss"; 
                         @import "./src/assets/styles/sass/_extend.scss";`,
      },
    },
  },
});
