// eslint-disable-next-line import/no-extraneous-dependencies
import { defineConfig } from "vite";
import path from 'path';
// eslint-disable-next-line import/no-extraneous-dependencies
import vue from '@vitejs/plugin-react';


export default defineConfig({
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },
  plugins: [vue()],
})