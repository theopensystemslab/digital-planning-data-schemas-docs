import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import prismjs from "vite-plugin-prismjs"

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react({
      babel: {
        plugins: [
          [
            "prismjs",
            {
              languages: ["javascript"],
              plugins: [],
              theme: "twilight",
              css: false,
            },
          ],
        ],
      },
    }),
    prismjs({
      languages: ["javascript"],
      plugins: [],
      theme: "twilight",
      css: false,
    }),
  ],
  build: {
    commonjsOptions: { transformMixedEsModules: true },
  }
})
