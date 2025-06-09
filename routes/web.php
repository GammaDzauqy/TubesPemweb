<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Web\HomeController; // Pastikan ini diimport

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

// Ini adalah rute yang akan me-render komponen Inertia 'Welcome'
Route::get('/', [HomeController::class, 'welcome']);

// Anda bisa menambahkan rute web lainnya di sini jika diperlukan
// Contoh:
// Route::get('/about', function () {
//     return Inertia::render('AboutPage');
// });