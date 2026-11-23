<?php

namespace App\Models\Concerns;

trait HasTranslations
{
    public function translate(string $field, ?string $locale = null): string
    {
        $locale ??= app()->getLocale();
        $value = $this->getAttribute($field);

        if (is_string($value)) {
            $decoded = json_decode($value, true);
            $value = is_array($decoded) ? $decoded : [];
        }

        if (! is_array($value)) {
            return '';
        }

        foreach ([$locale, 'es', 'en', 'ca'] as $candidate) {
            $text = $value[$candidate] ?? null;

            if (is_string($text) && trim($text) !== '') {
                return $text;
            }
        }

        return '';
    }

    /**
     * @return array{es: string, en: string, ca: string}
     */
    public function translationSet(string $field): array
    {
        $value = $this->getAttribute($field);

        if (is_string($value)) {
            $decoded = json_decode($value, true);
            $value = is_array($decoded) ? $decoded : [];
        }

        if (! is_array($value)) {
            $value = [];
        }

        return [
            'es' => is_string($value['es'] ?? null) ? $value['es'] : '',
            'en' => is_string($value['en'] ?? null) ? $value['en'] : '',
            'ca' => is_string($value['ca'] ?? null) ? $value['ca'] : '',
        ];
    }
}
