<?php

namespace App\Support;

use Illuminate\Support\Str;

class Translations
{
    /**
     * @return array<string, list<string>>
     */
    public static function rules(string $field, bool $required = false, int $max = 5000): array
    {
        return [
            $field.'.es' => [$required ? 'required' : 'nullable', 'string', 'max:'.$max],
            $field.'.en' => ['nullable', 'string', 'max:'.$max],
            $field.'.ca' => ['nullable', 'string', 'max:'.$max],
        ];
    }

    /**
     * @param  array<string, mixed>  $validated
     * @return array{es: string, en: string, ca: string}
     */
    public static function from(array $validated, string $key): array
    {
        $group = $validated[$key] ?? [];

        if (! is_array($group)) {
            $group = [];
        }

        return [
            'es' => is_string($group['es'] ?? null) ? trim($group['es']) : '',
            'en' => is_string($group['en'] ?? null) ? trim($group['en']) : '',
            'ca' => is_string($group['ca'] ?? null) ? trim($group['ca']) : '',
        ];
    }

    /**
     * @param  callable(string): bool  $exists
     */
    public static function uniqueSlug(string $title, callable $exists, string $fallback = 'entrada'): string
    {
        $base = Str::slug($title);

        if ($base === '') {
            $base = $fallback;
        }

        $slug = $base;
        $suffix = 2;

        while ($exists($slug)) {
            $slug = $base.'-'.$suffix;
            $suffix++;
        }

        return $slug;
    }
}
