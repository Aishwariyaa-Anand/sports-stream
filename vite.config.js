import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [
    react(),
  ],
  build: {
    // Add title option here
    rollupOptions: {
      output: {
        manualChunks: undefined,
      },
    },
  },
  html: {
    // Set the title here
    title: 'Sports-Stream',
  },
});