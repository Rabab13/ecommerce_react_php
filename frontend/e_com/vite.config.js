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
        target: 'https://47c5-196-134-122-3.ngrok-free.app', //updated ngrok URL
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
