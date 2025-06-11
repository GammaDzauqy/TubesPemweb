<?php

namespace App\Policies;

use App\Models\Project;
use App\Models\User;
use Illuminate\Auth\Access\Response;

class ProjectPolicy
{
    /**
     * Determine whether the user can view any models.
     */
    public function viewAny(User $user)
    {
        return $user->hasAnyRole(['Superadmin', 'Admin', 'Project Manager', 'Team Member']);
    }

    /**
     * Determine whether the user can view the model.
     */
    public function view(User $user, Project $project)
    {
        return $user->hasAnyRole(['Superadmin', 'Admin', 'Project Manager', 'Team Member']);
    }

    /**
     * Determine whether the user can create models.
     */
    public function create(User $user)
    {
        // return $user->hasPermissionTo('create project');
        return $user->hasAnyRole(['Superadmin', 'Admin', 'Project Manager']);
    }

    /**
     * Determine whether the user can update the model.
     */
    public function update(User $user, Project $project)
    {
        return $user->hasAnyRole(['Superadmin', 'Admin', 'Project Manager']);
    }

    /**
     * Determine whether the user can delete the model.
     */
    public function delete(User $user, Project $project)
    {
        return $user->hasAnyRole(['Superadmin', 'Admin']);
    }

    // /**
    //  * Determine whether the user can restore the model.
    //  */
    // public function restore(User $user, Project $project): bool
    // {
    //     //
    // }

    // /**
    //  * Determine whether the user can permanently delete the model.
    //  */
    // public function forceDelete(User $user, Project $project): bool
    // {
    //     //
    // }
}
