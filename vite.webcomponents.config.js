import { defineConfig } from 'vite';
import dts from "vite-plugin-dts";
import { svelte } from '@sveltejs/vite-plugin-svelte';
import path from 'path';

export default defineConfig({
    plugins: [svelte({
        compilerOptions: {
            customElement: true,
        },
    }),],
    build: {
        outDir: path.resolve(__dirname, './dist-wc'),
        emptyOutDir: true,
        minify: false,
        lib: {
            entry: path.resolve(__dirname, './src/lib/index.wc.ts'),
            name: 'Scrollyteller',
            formats: ['es']
        },
    }
});
