# Rotaract Club de Barcelona Diagonal

Web del club: páginas públicas en español, inglés y catalán, y un panel para que la junta actualice proyectos, miembros, enlaces, noticias, actividades y los mensajes del formulario de contacto.

La web anterior era una SPA de Vite y React. El contenido vivía en JSON y el acceso de administración era una marca en `localStorage`. Esta versión es una aplicación Laravel: la autenticación, las validaciones y los datos viven en el servidor.

## Por qué este frontend

Usamos el [starter kit oficial de Laravel con React](https://github.com/laravel/react-starter-kit): Inertia, React, Tailwind y los componentes del kit (estilo shadcn).

- El sitio que había ya estaba en React, así que las páginas se reescribieron sobre la misma base.
- Inertia deja las rutas, la sesión y la validación en Laravel. El navegador recibe las páginas como componentes React.
- El kit ya trae Tailwind, los componentes de interfaz, el login, la verificación de correo, el restablecimiento de contraseña, el doble factor y las passkeys. No hace falta montar un panel de autenticación aparte.
- El registro público está desactivado. Solo entra quien tenga una cuenta de administración creada con el seeder o desde la base de datos.

## Qué hay en la web

| Página                  | Ruta                               |
| ----------------------- | ---------------------------------- |
| Inicio                  | `/`                                |
| Proyectos               | `/proyectos` y `/proyectos/{slug}` |
| Quiénes somos           | `/quienes-somos`                   |
| Reuniones y actividades | `/reuniones`                       |
| Miembros y junta        | `/miembros`                        |
| Enlaces útiles          | `/enlaces`                         |
| Noticias                | `/noticias`                        |
| Contacto                | `/contacto`                        |
| Panel                   | `/admin`                           |
| Mapa del sitio          | `/sitemap.xml`                     |

El idioma por defecto es el español. El selector guarda la elección en la cookie `locale` durante un año. Los textos fijos salen de `resources/i18n/`. Los proyectos, miembros, enlaces, noticias y actividades se traducen en el panel (es, en, ca) y se guardan en Postgres en producción, o en SQLite en local.

La reunión de los lunes (20:30–21:30, Carrer de Bruc 147) sigue siendo texto fijo. Las actividades extraordinarias se publican desde el panel y aparecen en Reuniones. El formulario de contacto convive con el enlace a Instagram; no lo sustituye.

Las fotos que vienen con el seeder están en `public/`. Las que se suben desde el panel van al disco `MEDIA_DISK`: `public` en local y Cloudflare R2 en Vercel. El disco del contenedor no conserva archivos.

## Arrancar en local

Hace falta PHP 8.3 o superior, Composer, Node 22 y npm.

```bash
composer install
cp .env.example .env
php artisan key:generate
touch database/database.sqlite
```

En `.env` (ese archivo no se sube al repositorio) define el administrador antes de sembrar:

```dotenv
ADMIN_EMAIL=admin@rotaractdiagonal.org
ADMIN_PASSWORD=una-contrasena-larga
```

```bash
php artisan migrate --seed
php artisan storage:link
npm install
npm run dev
```

En otra terminal:

```bash
php artisan serve
```

La web queda en `http://localhost:8000`. El panel está en `/admin`. Si olvidas la contraseña:

```bash
php artisan admin:password
```

Ese comando lee `ADMIN_EMAIL` y `ADMIN_PASSWORD` del entorno, marca la cuenta como administradora y la deja verificada. El seeder crea el usuario solo si las dos variables tienen valor, y no cambia la contraseña si el usuario ya existe.

Los correos (recuperar contraseña, verificación) se escriben en el log con `MAIL_MAILER=log`. En producción hace falta un mailer real si se quieren esos correos.

## Tests

```bash
php artisan test
```

La base de los tests es SQLite en memoria. También se pueden lanzar los mismos controles que la integración continua:

```bash
composer ci:check
```

Eso formatea con Pint, pasa PHPStan, comprueba TypeScript y ejecuta PHPUnit.

## Despliegue en Vercel

El proyecto de Vercel sigue siendo el mismo. Al fusionar esta rama, el despliegue deja de ser la SPA de Vite y pasa a ser el contenedor de Laravel. La base de datos no está en Vercel: hay que crearla antes, o el sitio responderá con error en cuanto intente leer datos.

### Cuentas

1. [Neon](https://neon.tech): Postgres del plan gratuito. Sin tarjeta. El plan gratuito se mantiene; el cómputo se apaga cuando no hay tráfico y los datos siguen ahí. Límites orientativos del plan: unos 100 proyectos, 100 CU-hours al mes por proyecto y 1 GB de almacenamiento por proyecto. Confirma las cifras en la página de precios de Neon antes de depender de ellas.
2. [Cloudflare R2](https://developers.cloudflare.com/r2/pricing/): las fotos que suba el panel. El plan gratuito suele incluir unos 10 GB, 1 millón de operaciones de escritura y 10 millones de lectura, sin coste de salida. Contrasta el precio actual.
3. Vercel, plan Hobby, con el runtime de contenedores. Ese runtime está en beta y está en todos los planes. Hobby incluye unas 4 horas de CPU activas, 360 GB-hora de memoria aprovisionada y 1 millón de invocaciones al mes. El contenedor escala a cero, así que la primera visita después de un rato puede tardar (arranque en frío). El plan Hobby no es para uso comercial: el club tiene que confirmar que le encaja.

No uses el runtime `vercel-php`. Ese repositorio está archivado. La vía actual es el contenedor oficial con FrankenPHP, definida en `Dockerfile`, `Caddyfile` y `vercel.json`.

### Variables en Vercel

No ejecutes `php artisan config:cache` ni `php artisan optimize`. Vercel inyecta las variables al arrancar el contenedor; una config cacheada dentro de la imagen se quedaría con los valores de la compilación.

| Variable                      | Valor                                                            |
| ----------------------------- | ---------------------------------------------------------------- |
| `APP_ENV`                     | `production`                                                     |
| `APP_DEBUG`                   | `false`                                                          |
| `APP_KEY`                     | la salida de `php artisan key:generate --show`                   |
| `APP_URL`                     | `https://rotaract-page.vercel.app`                               |
| `APP_LOCALE`                  | `es`                                                             |
| `APP_TIMEZONE`                | `Europe/Madrid`                                                  |
| `LOG_CHANNEL`                 | `stderr`                                                         |
| `DB_CONNECTION`               | `pgsql`                                                          |
| `DB_URL`                      | cadena pooled de Neon, con el host `-pooler` y `sslmode=require` |
| `SESSION_DRIVER`              | `database`                                                       |
| `CACHE_STORE`                 | `database`                                                       |
| `QUEUE_CONNECTION`            | `sync`                                                           |
| `MEDIA_DISK`                  | `s3`                                                             |
| `AWS_ACCESS_KEY_ID`           | clave de R2                                                      |
| `AWS_SECRET_ACCESS_KEY`       | secreto de R2                                                    |
| `AWS_DEFAULT_REGION`          | `auto`                                                           |
| `AWS_BUCKET`                  | nombre del bucket                                                |
| `AWS_ENDPOINT`                | `https://<ACCOUNT_ID>.r2.cloudflarestorage.com`                  |
| `AWS_URL`                     | URL pública del bucket (dominio `r2.dev` o uno propio)           |
| `AWS_USE_PATH_STYLE_ENDPOINT` | `true`                                                           |
| `ADMIN_NAME`                  | nombre que verá el panel                                         |
| `ADMIN_EMAIL`                 | correo del administrador                                         |
| `ADMIN_PASSWORD`              | contraseña inicial, larga                                        |
| `MAIL_MAILER`                 | un mailer real si se quiere recuperar la contraseña por correo   |

La conexión de Postgres fuerza `PDO::ATTR_EMULATE_PREPARES` porque el pooler de Neon (PgBouncer en modo transacción) no admite prepared statements nativos.

### Orden recomendado

1. Crea el proyecto en Neon y copia la cadena pooled.
2. Crea el bucket de R2, un token con permiso de lectura y escritura, y la URL pública.
3. En el proyecto de Vercel, pon el Framework Preset en Other, o deja que detecte el `Dockerfile`. Si se queda en Vite, Vercel ignorará el contenedor y el despliegue seguirá intentando construir la SPA antigua.
4. Carga las variables de arriba. No las subas al repositorio.
5. Desde un ordenador, con el mismo `DB_URL` de Neon en un `.env` local que no se commitea:

```bash
php artisan migrate --force
php artisan db:seed --force
```

Hazlo antes de que llegue tráfico, o justo después del primer despliegue. El contenedor no migra al arrancar. Las fotos del seeder ya van en el repositorio y no pasan por R2.

6. Fusiona la pull request. Vercel construye la imagen y publica el contenedor.
7. Entra en `/admin` con `ADMIN_EMAIL` y `ADMIN_PASSWORD`. Si la contraseña se pierde y el correo aún no está configurado, vuelve a exportar las dos variables y ejecuta `php artisan admin:password` contra Neon.

`/health` responde `{"status":"ok"}` sin tocar la base de datos. `/up` es la sonda de Laravel.
