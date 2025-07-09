<?php

namespace App\Actions\Fortify;

use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\Rule;
use Laravel\Fortify\Contracts\CreatesNewUsers;

class CreateNewUser implements CreatesNewUsers
{
    use PasswordValidationRules;

    /**
     * Validate and create a newly registered user.
     *
     * @param  array<string, string>  $input
     */
    public function create(array $input): User
    {
        Validator::make($input, [
            'user_type' => ['required', 'string', 'in:Individual,Private Business,Organisation,Company,Institution'],
            'email' => [
                'required',
                'string',
                'email',
                'max:255',
                Rule::unique(User::class),
            ],
            'password' => ['required', 'string', 'confirmed'],
            'institution_name' => ['required_if:user_type,Institution', 'nullable', 'string'],
            'contact_person' => ['required', 'string', 'max:255'],
            'city' => ['required', 'string'],
            'street' => ['required', 'string'],
            'state' => ['required', 'string'],
            'zip_code' => ['required', 'string'],

        ])->validate();

        return User::create([
            'name' => $input['name'],
            'email' => $input['email'],
            'password' => Hash::make($input['password']),
            'institution_name' => $input['institution_name'] ?? null,
            'street' => $input['street'] ?? null,
            'city' => $input['city'] ?? null,
            'state' => $input['state'] ?? null,
            'zip_code' => $input['zip_code'] ?? null,
            'contact_person' => $input['contact_person'] ?? null,
            'phone' => $input['phone'] ?? null,
            'user_type' => $input['user_type'],
        ]);
    }
}
