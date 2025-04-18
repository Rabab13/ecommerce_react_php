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
        target: 'https://aa42-196-134-167-211.ngrok-free.app/',
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
