// import { defineConfig } from 'vite'
// import react from '@vitejs/plugin-react-swc'

// // https://vite.dev/config/
// export default defineConfig({
//   plugins: [react()],
//   server: {
//     port: 5173,
//     proxy: {
//       '/users': {
//         target: 'https://localhost:7119',
//         changeOrigin: true,
//         secure: false
//       }
//     }
//   }
// })

import { defineConfig } from "vite"
import react from "@vitejs/plugin-react-swc"

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
})
