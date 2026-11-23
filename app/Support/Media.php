<?php

namespace App\Support;

use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;
use Illuminate\Validation\ValidationException;

class Media
{
    public static function disk(): string
    {
        $disk = config('club.media_disk');

        return is_string($disk) && $disk !== '' ? $disk : 'public';
    }

    public static function url(?string $path): ?string
    {
        if ($path === null || $path === '') {
            return null;
        }

        if (str_starts_with($path, 'http://') || str_starts_with($path, 'https://')) {
            return $path;
        }

        if (! str_starts_with($path, 'uploads/')) {
            return asset($path);
        }

        return Storage::disk(self::disk())->url($path);
    }

    public static function store(UploadedFile $file, string $directory): string
    {
        $path = $file->store($directory, [
            'disk' => self::disk(),
            'visibility' => 'public',
        ]);

        if (! is_string($path)) {
            throw ValidationException::withMessages([
                'photo' => 'No se pudo guardar la imagen. Revisa el almacenamiento (en producción hace falta R2).',
            ]);
        }

        return $path;
    }

    public static function delete(?string $path): void
    {
        if ($path === null || ! str_starts_with($path, 'uploads/')) {
            return;
        }

        Storage::disk(self::disk())->delete($path);
    }
}
