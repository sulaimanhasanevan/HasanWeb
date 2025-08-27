import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react' // or vue, etc.

export default defineConfig({
  plugins: [react()],
  css: {
    postcss: './postcss.config.js', // if you have a separate config
  },
})