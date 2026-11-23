<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\App;
use Symfony\Component\HttpFoundation\Response;

class SetLocale
{
    /**
     * @param  Closure(Request): Response  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        $cookie = $request->cookie('locale');
        $locale = is_string($cookie) && in_array($cookie, ['es', 'en', 'ca'], true)
            ? $cookie
            : 'es';

        App::setLocale($locale);
        Carbon::setLocale($locale);

        return $next($request);
    }
}
