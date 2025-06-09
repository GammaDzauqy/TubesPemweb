import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';
import react from '@vitejs/plugin-react'; // Import plugin React

export default defineConfig({
    plugins: [
        laravel({
            input: ['resources/css/app.css', 'resources/js/app.tsx'], // Ubah ke .tsx
            refresh: true,
        }),
        react(), // Tambahkan plugin React
    ],
});