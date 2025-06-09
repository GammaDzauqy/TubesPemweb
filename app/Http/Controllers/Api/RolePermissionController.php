<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Spatie\Permission\Models\Role;
use Spatie\Permission\Models\Permission;
use App\Models\User;
use Illuminate\Support\Facades\Validator;

class RolePermissionController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth:api');
        // Contoh middleware untuk otorisasi
        // $this->middleware('permission:manage roles')->only(['storeRole', 'updateRole', 'destroyRole']);
        // $this->middleware('permission:assign roles')->only(['assignRoleToUser', 'removeRoleFromUser']);
    }

    // --- Role Management ---

    public function getAllRoles()
    {
        $roles = Role::all();
        return response()->json($roles);
    }

    public function storeRole(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|unique:roles,name',
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 400);
        }

        $role = Role::create(['name' => $request->name]);
        return response()->json(['message' => 'Role created successfully', 'role' => $role], 201);
    }

    public function updateRole(Request $request, Role $role)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|unique:roles,name,' . $role->id,
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 400);
        }

        $role->update(['name' => $request->name]);
        return response()->json(['message' => 'Role updated successfully', 'role' => $role]);
    }

    public function destroyRole(Role $role)
    {
        $role->delete();
        return response()->json(['message' => 'Role deleted successfully']);
    }

    // --- Permission Management ---

    public function getAllPermissions()
    {
        $permissions = Permission::all();
        return response()->json($permissions);
    }

    public function storePermission(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|unique:permissions,name',
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 400);
        }

        $permission = Permission::create(['name' => $request->name]);
        return response()->json(['message' => 'Permission created successfully', 'permission' => $permission], 201);
    }

    public function updatePermission(Request $request, Permission $permission)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|unique:permissions,name,' . $permission->id,
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 400);
        }

        $permission->update(['name' => $request->name]);
        return response()->json(['message' => 'Permission updated successfully', 'permission' => $permission]);
    }

    public function destroyPermission(Permission $permission)
    {
        $permission->delete();
        return response()->json(['message' => 'Permission deleted successfully']);
    }

    // --- Assign Roles/Permissions to Users/Roles ---

    public function assignRoleToUser(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'user_id' => 'required|exists:users,id',
            'role_name' => 'required|exists:roles,name',
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 400);
        }

        $user = User::find($request->user_id);
        $user->assignRole($request->role_name);

        return response()->json(['message' => 'Role assigned to user successfully']);
    }

    public function removeRoleFromUser(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'user_id' => 'required|exists:users,id',
            'role_name' => 'required|exists:roles,name',
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 400);
        }

        $user = User::find($request->user_id);
        $user->removeRole($request->role_name);

        return response()->json(['message' => 'Role removed from user successfully']);
    }

    public function givePermissionToRole(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'role_name' => 'required|exists:roles,name',
            'permission_name' => 'required|exists:permissions,name',
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 400);
        }

        $role = Role::findByName($request->role_name);
        $role->givePermissionTo($request->permission_name);

        return response()->json(['message' => 'Permission given to role successfully']);
    }

    public function revokePermissionFromRole(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'role_name' => 'required|exists:roles,name',
            'permission_name' => 'required|exists:permissions,name',
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 400);
        }

        $role = Role::findByName($request->role_name);
        $role->revokePermissionTo($request->permission_name);

        return response()->json(['message' => 'Permission revoked from role successfully']);
    }

    public function givePermissionToUser(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'user_id' => 'required|exists:users,id',
            'permission_name' => 'required|exists:permissions,name',
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 400);
        }

        $user = User::find($request->user_id);
        $user->givePermissionTo($request->permission_name);

        return response()->json(['message' => 'Permission given to user successfully']);
    }

    public function revokePermissionFromUser(Request $request)
    {
        $validator = Validator->make($request->all(), [
            'user_id' => 'required|exists:users,id',
            'permission_name' => 'required|exists:permissions,name',
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 400);
        }

        $user = User::find($request->user_id);
        $user->revokePermissionTo($request->permission_name);

        return response()->json(['message' => 'Permission revoked from user successfully']);
    }
}