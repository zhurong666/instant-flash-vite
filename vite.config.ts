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
    }
})
