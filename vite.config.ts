import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
  css: {
    preprocessorOptions: {
      less: {
        additionalData: `@import "@/assets/common.less";`,
      },
    },
  },
  server: {
    proxy: {
      "/api": {
        secure: false,
        changeOrigin: true,
        target: "https://124.70.23.119:3045"
      },
    },
  },
});
