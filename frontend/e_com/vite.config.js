import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  
  server: {
    host: true,         // Ensure it's accessible via network
    port: 5173,         // Force Vite to use port 5173
    strictPort: true,   // Fail if port 5173 is not available
    proxy: {
      '/graphql': {
        target: 'http://localhost:8000', // Ensure this matches your backend URL
        changeOrigin: true,
        secure: false,
      },
    },
    allowedHosts: ['416b-196-134-194-253.ngrok-free.app'],  // <-- Add your ngrok domain here
  },
});