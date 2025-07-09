<?php
namespace App\Http\Middleware;

use Illuminate\Auth\Middleware\Authenticate as Middleware;
use Illuminate\Http\Request;

class Authenticate extends Middleware
{
    /**
     * Get the path the user should be redirected to when they are not authenticated.
     */
    protected function redirectTo(Request $request): ?string
    {
        // If the request expects a JSON response, return null to prevent redirection.
        // This will let the default exception handler return a 401 JSON response.
        // Otherwise, redirect to the 'login' named route for web requests.
        return $request->expectsJson() ? null : route('login');
    }
}