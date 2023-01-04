import { fileURLToPath, URL } from 'node:url';

import vue from '@vitejs/plugin-vue'
import { defineConfig } from 'vite'

const url = new URL('./src', import.meta.url);

export default defineConfig({
    plugins: [vue()],
    resolve: {
        alias: {
            '@': fileURLToPath(url)
        }
    },
    css: {
        preprocessorOptions: {
            scss: {
                additionalData: `
                  @import "${ url }/assets/scss/parts/_mixins.scss";
                  @import "${ url }/assets/scss/parts/_media.scss";
              `
            }
        }
    },
})
