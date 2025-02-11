import legacy from "@vitejs/plugin-legacy"
import { defineConfig } from "vite"
import autoprefixer from "autoprefixer"

export default defineConfig({
    plugins: [
        legacy({
            targets: ["defaults", "not IE 11"],
        }),
    ],
    css: {
        postcss: {
            plugins: [autoprefixer()],
        },
    },
})
