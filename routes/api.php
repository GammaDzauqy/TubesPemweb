<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\RolePermissionController;

// Rute default yang dibuat oleh install:api
Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

// Tambahkan rute otentikasi JWT Anda
Route::group([
    'middleware' => 'api', // Middleware 'api' sangat penting untuk JWT
    'prefix' => 'auth'
], function ($router) {
    Route::post('login', [AuthController::class, 'login']);
    Route::post('register', [AuthController::class, 'register']);
    Route::post('logout', [AuthController::class, 'logout']);
    Route::post('refresh', [AuthController::class, 'refresh']);
    Route::get('me', [AuthController::class, 'me']);
});

// Tambahkan rute manajemen peran dan izin Anda
Route::group([
    'middleware' => ['api', 'auth:api'] // Pastikan 'auth:api' melindungi rute ini
], function ($router) {
    // Role Management
    Route::get('roles', [RolePermissionController::class, 'getAllRoles']);
    Route::post('roles', [RolePermissionController::class, 'storeRole']);
    Route::put('roles/{role}', [RolePermissionController::class, 'updateRole']);
    Route::delete('roles/{role}', [RolePermissionController::class, 'destroyRole']);

    // Permission Management
    Route::get('permissions', [RolePermissionController::class, 'getAllPermissions']);
    Route::post('permissions', [RolePermissionController::class, 'storePermission']);
    Route::put('permissions/{permission}', [RolePermissionController::class, 'updatePermission']);
    Route::delete('permissions/{permission}', [RolePermissionController::class, 'destroyPermission']);

    // Assign/Remove Roles/Permissions
    Route::post('assign-role', [RolePermissionController::class, 'assignRoleToUser']);
    Route::post('remove-role', [RolePermissionController::class, 'removeRoleFromUser']);
    Route::post('give-permission-to-role', [RolePermissionController::class, 'givePermissionToRole']);
    Route::post('revoke-permission-from-role', [RolePermissionController::class, 'revokePermissionFromRole']);
    Route::post('give-permission-to-user', [RolePermissionController::class, 'givePermissionToUser']);
    Route::post('revoke-permission-from-user', [RolePermissionController::class, 'revokePermissionFromUser']);
});