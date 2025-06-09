<?php

namespace App\Http\Controllers\Web;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;

class HomeController extends Controller
{
    public function welcome()
    {
        return Inertia::render('Welcome', [ // 'Welcome' merujuk ke resources/js/Pages/Welcome.tsx
            'name' => 'World', // Contoh props yang dikirim ke komponen React
        ]);
    }

    public function dashboard()
    {
        // Pastikan middleware auth:web aktif di rute ini jika perlu otentikasi sesi
        return Inertia::render('Dashboard', [
            'message' => 'Welcome to your dashboard!',
        ]);
    }
}