import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      external: ['react-router-dom', '@supabase/supabase-js'], // Aggiunto Supabase come dipendenza esterna
    },
  },
})
