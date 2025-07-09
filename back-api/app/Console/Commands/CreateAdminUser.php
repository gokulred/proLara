<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use App\Models\User;
use Illuminate\Support\Facades\Hash;

class CreateAdminUser extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'app:create-admin-user';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Command description';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        $user = User::create([
            'contact_person' => 'Admin User',
            'email' => 'admin@example.com',
            'password' => Hash::make('Redviolet661'),
            'user_type' => 'Admin',
            'approved_at' => now(),
            'is_admin' => true,
        ]);
        $this->info("Admin user created successfully!");
    }
}

