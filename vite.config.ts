import {defineConfig} from 'vite'
import vue from '@vitejs/plugin-vue'
import {resolve} from 'path'

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [vue()],
    resolve: {
        alias: {
            /** @ 符号指向 src 目录 */
            "@": resolve(__dirname, "./src")
        }
    },
    server: {
        proxy: process.env.VITE_PROXY === 'true' ? {
            '/api': {
                target: 'http://139.9.87.80:8080',
                changeOrigin: true,
                rewrite: (path) => path.replace(/^\/api/, '')
            }
        } : undefined
        // 正则表达式写法
        // '^/fallback/.*': {
        //     target: 'http://jsonplaceholder.typicode.com',
        //     changeOrigin: true,
        //     rewrite: (path) => path.replace(/^\/fallback/, '')
        // },
        // 使用 proxy 实例
        // '/api': {
        //     target: 'http://jsonplaceholder.typicode.com',
        //     changeOrigin: true,
        //     configure: (proxy, options) => {
        //         proxy 是 'http-proxy' 的实例
        // }
        // },
        // Proxying websockets or socket.io
        // '/socket.io': {
        //     target: 'ws://localhost:3000',
        //     ws: true
        // }
    }
})
