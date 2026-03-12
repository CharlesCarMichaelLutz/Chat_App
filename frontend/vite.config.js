import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

//production build
// export default defineConfig({
//   plugins: [react()],
//   server: { host: true },
// });

//development build with proxy to backend
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

//run localhost as https but SSL does not allow
// export default defineConfig({
//   plugins: [react()],
//   server: { 
//     host: true,
//     https: true,
//     port: 5173
//    },
// });
