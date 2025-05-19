import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],

  server: {
    host: true, 
    port: 5173, 
    strictPort: true,

    proxy: {
      '/graphql.php': {
        target: 'https://f1a1-156-208-83-105.ngrok-free.app', //updated ngrok URL
        changeOrigin: true,
        secure: false,
        configure: (proxy) => {
          proxy.on('proxyReq', (proxyReq) => {
            proxyReq.method = 'POST'; 
          });
        },
      },
    },
  },
});
