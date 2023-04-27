import { defineConfig } from 'vite'
import { resolve } from 'path'

export default defineConfig({
	plugins: [],
	server: { host: '0.0.0.0', port: 8000 },
	clearScreen: false,
	base:"/group-project-build-blocks/",
	build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        editor: resolve(__dirname, 'editor.html'),
      },
    },
  },
})
