import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"
import tsconfigPaths from "vite-tsconfig-paths"

// https://vitejs.dev/config/
export default defineConfig({
  define:{
     'import.meta.env.VITE_FIREBASE_API_KEY': JSON.stringify(process.env.VITE_FIREBASE_API_KEY),
    'import.meta.env.VITE_FIREBASE_AUTH_DOMAIN': JSON.stringify(process.env.VITE_FIREBASE_AUTH_DOMAIN),
    'import.meta.env.VITE_FIREBASE_PROJECT_ID': JSON.stringify(process.env.VITE_FIREBASE_PROJECT_ID),
    'import.meta.env.VITE_FIREBASE_DATABASE_URL':JSON.stringify.apply(process.env.VITE_FIREBASE_DATABASE_URL),
    'import.meta.env.VITE_FIREBASE_STORAGE_BUCKET':JSON.stringify(process.env.VITE_FIREBASE_STORAGE_BUCKET),
    'import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID':JSON.stringify(process.env.VITE_FIREBASE_MESSAGING_SENDER_ID),
    'import.meta.env.VITE_FIREBASE_APP_ID':JSON.stringify(process.env.VITE_FIREBASE_APP_ID),
  },
  base:"/Story_Collaboration",
  plugins: [react(), tsconfigPaths()],
})