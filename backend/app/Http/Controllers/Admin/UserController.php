<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;

class UserController extends Controller
{
    /**
     * Display a listing of the users.
     * Can be filtered by 'pending' status.
     */
    public function index(Request $request)
    {
        // Start a query for users that are NOT admins
        $query = User::where('is_admin', false);

        // If the request has a 'status' parameter equal to 'pending',
        // add a condition to only get users who have not been approved.
        $query->when($request->status === 'pending', function ($q) {
            return $q->whereNull('approved_at');
        });

        // Get the final list of users, newest first, and return as JSON
        $users = $query->latest()->get();

        return response()->json($users);
    }

    /**
     * Approve the specified user.
     * Laravel automatically finds the User model corresponding to the {user} ID.
     */
    public function approve(User $user)
    {
        // Set the 'approved_at' timestamp to the current time
        $user->update(['approved_at' => now()]);

        return response()->json(['message' => 'User approved successfully.']);
    }

    /**
     * Remove the specified user from the database.
     */
    public function destroy(User $user)
    {
        $user->delete();

        return response()->json(['message' => 'User deleted successfully.']);
    }
}