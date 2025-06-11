<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Role;
use Spatie\Permission\Models\Permission;
use App\Models\User;
use Illuminate\Support\Facades\Hash;

class UserPermissionSeeder extends Seeder
{
    private $permissions = [
        'role',
        // 'user',
        // 'permission',
    ];

    public function run(): void
    {
        foreach ($this->permissions as $permission) {
            Permission::create(['name' => $permission]);
        }

        // Buat user default
        $user = User::create([
            'name' => 'Candra',
            'username' => 'candraditya',
            'email' => 'candraditya377@gmail.com',
            'password' => Hash::make('12345678'),
        ]);

        // Buat role Superadmin
        $role = Role::create(['name' => 'Superadmin']);

        $permissions = Permission::pluck('id', 'id')->all();
        $role->syncPermissions($permissions);

        // Assign role ke user
        if ($user && $role) {
            $user->assignRole([$role->id]);
        }
    }
}
