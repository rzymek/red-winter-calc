/// <reference types="vitest" />
import {defineConfig} from 'vite'
import preact from '@preact/preset-vite'
import {VitePWA} from 'vite-plugin-pwa'

// https://vitejs.dev/config/
export default defineConfig({
    base: '/red-winter-calc',
    test: {
        environment: "jsdom",
    },
    plugins: [
        preact(),
        VitePWA({
            registerType: 'autoUpdate',
            manifest: {
                name: "Red Winter",
                id: 'redwinter',
                short_name: 'redwinter',
                orientation: "portrait",
                launch_handler: {
                    client_mode: "auto"
                },
                description: "Red Winter",
                theme_color: "#FFFFE0",
                icons: [{
                    src: "pwa-64x64.png",
                    sizes: "64x64",
                    type: "image/png",
                    purpose: "any",
                }, {
                    src: "pwa-192x192.png",
                    sizes: "192x192",
                    type: "image/png",
                    purpose: "any",
                }, {
                    src: "pwa-512x512.png",
                    sizes: "512x512",
                    type: "image/png",
                    purpose: "any",
                }, {
                    src: "maskable-icon-512x512.png",
                    sizes: "512x512",
                    type: "image/png",
                    purpose: "maskable",
                }]
            }
        })
    ],
})
