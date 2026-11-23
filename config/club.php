<?php

return [

    'admin_name' => env('ADMIN_NAME', 'Administración'),

    'admin_email' => env('ADMIN_EMAIL'),

    'admin_password' => env('ADMIN_PASSWORD'),

    /*
    | Disco de las imágenes subidas desde el panel. En local, "public"
    | (php artisan storage:link). En Vercel el disco es efímero: usa "s3"
    | apuntando a Cloudflare R2. Las fotos que ya vienen en el repositorio
    | se sirven desde public/ y no pasan por este disco.
    */
    'media_disk' => env('MEDIA_DISK', 'public'),

    'instagram' => 'https://www.instagram.com/rotaractdiagonal/',

    'email' => 'rotaract.diagonal@rotary2202.org',

    'address' => 'Carrer de Bruc 147, 3º D, 2ª, 08037 Barcelona',

    'maps_query' => 'Carrer de Bruc 147, 08037 Barcelona',

    'locales' => ['es', 'en', 'ca'],

];
