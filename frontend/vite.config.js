import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

// https://vite.dev/config/
// export default defineConfig({
//   plugins: [react()],
//   server: { host: true },
// });

export default defineConfig({
  plugins: [react()],
  server: {
    host: true,
    port: 5173,
    proxy: {
      '/api': {
        target: 'http://localhost:5218', // your .NET API
        changeOrigin: true,
        secure: false, // only for HTTP
        rewrite: (path) => path.replace(/^\/api/, '') // remove /api prefix if needed
      }
    }
  }
});
