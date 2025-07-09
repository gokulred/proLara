<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Admin\UserController; // <-- Import the controller

// This route returns the currently authenticated user's data.
// It's used by the AuthContext in React.
Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

// This is the group for all admin-only actions.
// It requires a user to be logged in (auth:sanctum) AND be an admin (admin).
Route::middleware(['auth:sanctum', 'admin'])->prefix('admin')->group(function () {
    
    // GET /api/admin/users
    // Fetches all non-admin users. Can be filtered by status (e.g., ?status=pending)
    Route::get('/users', [UserController::class, 'index']);

    // POST /api/admin/users/{user}/approve
    // Approves a specific user. {user} is the user's ID.
    Route::post('/users/{user}/approve', [UserController::class, 'approve']);

    // DELETE /api/admin/users/{user}
    // Deletes a specific user.
    Route::delete('/users/{user}', [UserController::class, 'destroy']);

});