<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\Api\ProjectController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\RoleController;
use App\Http\Controllers\Api\TaskController;
use App\Http\Controllers\RegisterController;
use Inertia\Inertia;

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

Route::get('/', function () {
    return redirect()->route('login');
});

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    Route::middleware('role:admin')->group(function () {
        Route::resource('projects', ProjectController::class);
        Route::resource('tasks', TaskController::class);
    });

    Route::middleware('role:project-manager')->group(function () {
        Route::resource('projects', ProjectController::class);
        Route::resource('tasks', TaskController::class);
    });
    // Route::resource('projects', ProjectController::class);
    // Route::resource('tasks', TaskController::class);
    // Route::get('/projects/{project}', [ProjectController::class, 'show'])->name('projects.show');
    // Route::get('/tasks/{task}', [TaskController::class, 'show'])->name('tasks.show');
});

// Route::middleware('auth:sanctum')->group(function () {
//     Route::apiResource('tasks', TaskController::class);
//     Route::apiResource('Project', ProjectController::class);
// });

Route::middleware('guest')->group(function () {
    Route::get('/register', [RegisterController::class, 'create'])->name('register');
    Route::post('/register', [RegisterController::class, 'store']);
});

Route::prefix('roles')->group(function () {
    Route::get('/', [RoleController::class, 'index'])->name('roles');
    Route::post('/', [RoleController::class, 'store'])->name('roles');
    Route::post('/{id}', [RoleController::class, 'update'])->name('roles.update');
    Route::delete('{id}', [RoleController::class, 'destroy'])->name('roles.destroy');
});

// Route::middleware(['auth', 'role:admin'])->group(function () {
//     Route::get('/admin-panel', function () {
//         return Inertia::render('AdminPanel');
//     });

    // Bisa juga aktifkan kembali jika ingin khusus admin yang kelola project/task via Inertia
    // Route::resource('projects', ProjectController::class);
    // Route::resource('tasks', TaskController::class);
// });

// Route::middleware(['auth', 'role:project-manager'])->group(function () {
//     Route::get('/manage-projects', [ProjectController::class, 'index']);
//     Route::get('/manage-tasks', [TaskController::class, 'index']);
// });

require __DIR__.'/auth.php';