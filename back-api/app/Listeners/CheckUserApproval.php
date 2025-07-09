<?php

namespace App\Listeners;

use Illuminate\Auth\Events\Login;
use Illuminate\Validation\ValidationException;
use Illuminate\Support\Facades\Auth;
use Laravel\Fortify\Fortify;

class CheckUserApproval
{
    /**
     * Handle the event.
     */
    public function handle(Login $event): void
    {
        $user = $event->user;

        // Custom approval logic
        if (is_null($user->approved_at) && !$user->is_admin) {
            Auth::logout();

            throw ValidationException::withMessages([
                Fortify::username() => [trans('auth.pending_approval')],
            ]);
        }
    }
}