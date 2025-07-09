<?php

namespace App\Actions\Fortify;

use Illuminate\Validation\ValidationException;
use Illuminate\Support\Facades\Auth;
use Laravel\Fortify\Contracts\LoginResponse;
use Laravel\Fortify\Fortify;

class CustomLoginCheck
{
    public function __invoke($request)
    {
        // Attempt to login using Laravel's default Auth attempt
        if (!Auth::attempt($request->only(Fortify::username(), 'password'), $request->boolean('remember'))) {
            throw ValidationException::withMessages([
                Fortify::username() => [trans('auth.failed')],
            ]);
        }

        // Get authenticated user
        $user = Auth::user();

        // Custom approval logic
        if (is_null($user->approved_at) && !$user->is_admin) {
            Auth::logout();
            $request->session()->invalidate();
            $request->session()->regenerateToken();

            throw ValidationException::withMessages([
                Fortify::username() => [trans('auth.pending_approval')],
            ]);
        }

        return app(LoginResponse::class);
    }
}
