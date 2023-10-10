import vue from '@vitejs/plugin-vue'
import {defineConfig} from 'vite';

// https://vitejs.dev/config
export default defineConfig({
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
