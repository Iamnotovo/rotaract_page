<?php

namespace App\Support;

class SiteTranslator
{
    /** @var array<string, array<string, mixed>> */
    private array $cache = [];

    /**
     * @return array<string, mixed>
     */
    public function tree(?string $locale = null): array
    {
        $locale = $this->normalize($locale ?? app()->getLocale());

        if (isset($this->cache[$locale])) {
            return $this->cache[$locale];
        }

        $uiName = $locale === 'en' ? 'en.json' : $locale.'-ui.json';
        $ui = $this->read($uiName);
        $site = $locale === 'en' ? [] : $this->read('site-'.$locale.'.json');
        $extras = $this->read('extras-'.$locale.'.json');

        /** @var array<string, mixed> $merged */
        $merged = array_replace_recursive($ui, $site, $extras);

        return $this->cache[$locale] = $merged;
    }

    /**
     * @param  array<string, string|int>  $replace
     */
    public function get(string $key, array $replace = [], ?string $locale = null): string
    {
        $value = $this->lookup($this->tree($locale), $key);

        if (! is_string($value)) {
            $value = $this->lookup($this->tree('es'), $key);
        }

        if (! is_string($value)) {
            return $key;
        }

        foreach ($replace as $name => $replacement) {
            $value = str_replace('{{'.$name.'}}', (string) $replacement, $value);
        }

        return $value;
    }

    /**
     * @return list<array{code: string, label: string}>
     */
    public function locales(): array
    {
        return [
            ['code' => 'es', 'label' => 'Español'],
            ['code' => 'en', 'label' => 'English'],
            ['code' => 'ca', 'label' => 'Català'],
        ];
    }

    private function normalize(string $locale): string
    {
        return in_array($locale, ['es', 'en', 'ca'], true) ? $locale : 'es';
    }

    /**
     * @return array<string, mixed>
     */
    private function read(string $filename): array
    {
        $path = resource_path('i18n/'.$filename);

        if (! is_file($path)) {
            return [];
        }

        $decoded = json_decode((string) file_get_contents($path), true);

        if (! is_array($decoded)) {
            return [];
        }

        /** @var array<string, mixed> $decoded */
        return $decoded;
    }

    /**
     * @param  array<string, mixed>  $tree
     */
    private function lookup(array $tree, string $key): mixed
    {
        $current = $tree;

        foreach (explode('.', $key) as $segment) {
            if (! is_array($current) || ! array_key_exists($segment, $current)) {
                return null;
            }

            $current = $current[$segment];
        }

        return $current;
    }
}
