import vue from '@vitejs/plugin-vue'
import {defineConfig} from 'vite';
import {resolve} from "path";

// https://vitejs.dev/config
export default defineConfig({
    build: {
        rollupOptions: {
            input: {
                main: resolve(__dirname, 'index.html'),
                alert: resolve(__dirname, 'subpage/alert/index.html')
            }
        }
    },
    plugins: [
        vue()
    ],
    define: {'process.env': {}},
    resolve: {
        extensions: [
            '.js',
            '.json',
            '.jsx',
            '.mjs',
            '.ts',
            '.tsx',
            '.vue'
        ],
    },
});
