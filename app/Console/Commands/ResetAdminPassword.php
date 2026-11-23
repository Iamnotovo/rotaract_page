<?php

namespace App\Console\Commands;

use App\Models\User;
use Illuminate\Console\Command;

class ResetAdminPassword extends Command
{
    protected $signature = 'admin:password';

    protected $description = 'Actualiza la contraseña del administrador con ADMIN_EMAIL y ADMIN_PASSWORD';

    public function handle(): int
    {
        $email = config('club.admin_email');
        $password = config('club.admin_password');

        if (! is_string($email) || $email === '' || ! is_string($password) || $password === '') {
            $this->error('Define ADMIN_EMAIL y ADMIN_PASSWORD en el entorno.');

            return self::FAILURE;
        }

        $user = User::query()->where('email', $email)->first();

        if (! $user instanceof User) {
            $this->error('No existe ese usuario. Ejecuta php artisan db:seed primero.');

            return self::FAILURE;
        }

        $user->forceFill([
            'password' => $password,
            'is_admin' => true,
            'email_verified_at' => $user->email_verified_at ?? now(),
        ])->save();

        $this->info('Contraseña de administración actualizada.');

        return self::SUCCESS;
    }
}
