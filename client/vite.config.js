// import { defineConfig } from "vite"
// import react from "@vitejs/plugin-react-swc"
// import { fileURLToPath, URL } from "node:url"

// // https://vite.dev/config/
// export default defineConfig({
//   plugins: [react()],
//   build: {
//     outDir: "../backend/chatAppWebApi/wwwroot",
//     emptyOutDir: true,
//   },
//   resolve: {
//     alias: {
//       "@": fileURLToPath(new URL("./src", import.meta.url)),
//     },
//   },
// })

import { defineConfig } from "vite"
import react from "@vitejs/plugin-react-swc"
import { fileURLToPath, URL } from "node:url"

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    outDir: "../backend/chatAppWebApi/wwwroot",
    emptyOutDir: true,
  },
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
  server: {
    //host: "0.0.0.0", // Binds to all available network interfaces
    //port: 3000, // Change if needed to avoid conflicts
    host: true,
  },
})
