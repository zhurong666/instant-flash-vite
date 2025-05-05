import {defineConfig} from 'vite'
import vue from '@vitejs/plugin-vue'
import {resolve} from 'path'
import ElementPlus from 'unplugin-element-plus/vite'
// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        vue(),
        ElementPlus({
            useSource: true,
        }),
    ],
    resolve: {
        alias: {
            /** @ 符号指向 src 目录 */
            "@": resolve(__dirname, "./src")
        }
    },
    css: {
        preprocessorOptions: {
            scss: {
                additionalData: `@use "@/styles/element/index.scss" as *;`,
            },
        },
    },
    server: {
        proxy: process.env.NODE_ENV !== 'production' ? {
            // 字符串简写写法
            // '/foo': 'http://localhost:4567',
            // 选项写法
            '/api': {
                // target: 'http://127.0.0.1:8080/',
                target: 'https://api.yunzou.cloudns.org:10088/',
                changeOrigin: true,
                rewrite: (path) => path.replace(/^\/api/, '')
            },
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
        } : {}
    }
})
