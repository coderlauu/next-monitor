import path from 'node:path'

import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
    plugins: [react()],
    resolve: {
        alias: {
            '@': path.resolve(__dirname, './src'),
        },
    },
    server: {
        proxy: {
            '/api': {
                target: 'http://localhost:8001',
                changeOrigin: true,
            },
            '/dsn-api': {
                target: 'http://localhost:8000',
                changeOrigin: true,
                rewrite(path) {
                    return path.replace(/^\/dsn-api/, '/api')
                },
            },
        },
    },
})
