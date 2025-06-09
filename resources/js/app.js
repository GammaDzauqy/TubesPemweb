import './bootstrap'; // Jika Anda punya file bootstrap.js/ts untuk inisialisasi Laravel
import '../css/app.css'; // Untuk CSS Anda

import { createRoot } from 'react-dom/client';
import { createInertiaApp } from '@inertiajs/react';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';

createInertiaApp({
    // Judul halaman di browser
    title: (title) => `${title} - Your App Name`,
    // Fungsi untuk me-resolve komponen halaman
    resolve: (name) => resolvePageComponent(`./Pages/${name}.tsx`, import.meta.glob('./Pages/**/*.tsx')),
    // Setup aplikasi React
    setup({ el, App, props }) {
        const root = createRoot(el);
        root.render(<App {...props} />);
    },
    // Callback saat navigasi dimulai
    progress: {
        color: '#4B5563',
    },
});