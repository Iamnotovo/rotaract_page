<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;

class AdminSeeder extends Seeder
{
    public function run(): void
    {
        $email = config('club.admin_email');
        $password = config('club.admin_password');
        $name = config('club.admin_name');

        if (! is_string($email) || $email === '' || ! is_string($password) || $password === '') {
            $this->command?->warn('ADMIN_EMAIL o ADMIN_PASSWORD vacíos: no se crea el usuario de administración.');

            return;
        }

        $user = User::query()->where('email', $email)->first();

        if ($user instanceof User) {
            $user->forceFill([
                'is_admin' => true,
                'email_verified_at' => $user->email_verified_at ?? now(),
            ])->save();

            return;
        }

        User::query()->create([
            'name' => is_string($name) && $name !== '' ? $name : 'Administración',
            'email' => $email,
            'password' => $password,
            'email_verified_at' => now(),
            'is_admin' => true,
        ]);
    }
}
