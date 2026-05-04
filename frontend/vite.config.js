import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

//production
// export default defineConfig({
//   plugins: [react()],
//   server: { host: true },
// });

//development
export default defineConfig({
  plugins: [react()],
  server: {
    host: true,
    port: 5173,
    proxy: {
      '/api': {
        target: 'http://localhost:5218',
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/api/, '')
      }
    }
  }
});
