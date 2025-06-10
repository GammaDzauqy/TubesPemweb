<?php

namespace App\Http\Controllers\Web;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia; // Pastikan ini diimport

class HomeController extends Controller
{
    public function welcome()
    {
        return Inertia::render('Welcome', [ // 'Welcome' merujuk ke resources/js/Pages/Welcome.tsx
            'name' => 'World',
        ]);
    }
}