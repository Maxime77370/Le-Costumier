import path from 'path'
import { TanStackRouterVite } from '@tanstack/router-vite-plugin'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    TanStackRouterVite({
      generatedRouteTree: path.resolve(
        __dirname,
        'src/generated/routeTree.gen.ts'
      )
    })
  ],
  resolve: {
    alias: [
      { find: '@', replacement: path.resolve(__dirname, 'src') },
      { find: 'types', replacement: path.resolve(__dirname, 'types') }
    ]
  }
})
