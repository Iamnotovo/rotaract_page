<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}" @class(['dark' => ($appearance ?? 'system') == 'dark'])>
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">

        {{-- Inline script to detect system dark mode preference and apply it immediately --}}
        <script>
            (function() {
                const appearance = '{{ $appearance ?? "system" }}';

                if (appearance === 'system') {
                    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

                    if (prefersDark) {
                        document.documentElement.classList.add('dark');
                    }
                }
            })();
        </script>

        {{-- Inline style to set the HTML background color based on our theme in app.css --}}
        <style>
            html {
                background-color: oklch(1 0 0);
            }

            html.dark {
                background-color: oklch(0.145 0 0);
            }
        </style>

        <link rel="icon" href="/favicon.ico" sizes="any">
        <link rel="icon" href="/favicon.svg" type="image/svg+xml">
        <link rel="apple-touch-icon" href="/apple-touch-icon.png">

        @fonts

        @viteReactRefresh
        @vite(['resources/css/app.css', 'resources/js/app.tsx', "resources/js/pages/{$page['component']}.tsx"])
        <title>{{ $page['props']['seo']['title'] ?? config('app.name') }}</title>
        <meta name="description" content="{{ $page['props']['seo']['description'] ?? 'Rotaract Club de Barcelona Diagonal' }}">
        <link rel="canonical" href="{{ url($page['url']) }}">
        <meta property="og:title" content="{{ $page['props']['seo']['title'] ?? config('app.name') }}">
        <meta property="og:description" content="{{ $page['props']['seo']['description'] ?? '' }}">
        <meta property="og:type" content="website">
        <meta property="og:url" content="{{ url($page['url']) }}">
        <meta property="og:image" content="{{ asset('group-photo.jpeg') }}">
        <meta property="og:locale" content="{{ ['es' => 'es_ES', 'ca' => 'ca_ES', 'en' => 'en_US'][app()->getLocale()] ?? 'es_ES' }}">
        @if (str_starts_with($page['component'], 'admin/') || in_array($page['component'], ['dashboard'], true) || str_starts_with($page['component'], 'auth/') || str_starts_with($page['component'], 'settings/'))
            <meta name="robots" content="noindex, nofollow">
        @endif
        <x-inertia::head />
    </head>
    <body class="font-sans antialiased">
        <x-inertia::app />
    </body>
</html>
