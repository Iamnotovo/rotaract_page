<?php

use App\Http\Controllers\Admin\DashboardController;
use App\Http\Controllers\Admin\EventController;
use App\Http\Controllers\Admin\LinkController;
use App\Http\Controllers\Admin\MemberController;
use App\Http\Controllers\Admin\MessageController;
use App\Http\Controllers\Admin\NewsController;
use App\Http\Controllers\Admin\ProjectController;
use App\Http\Controllers\ContactController;
use App\Http\Controllers\LocaleController;
use App\Http\Controllers\PublicSiteController;
use App\Http\Controllers\SitemapController;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Route;

Route::get('/', [PublicSiteController::class, 'home'])->name('home');
Route::get('/proyectos', [PublicSiteController::class, 'projects'])->name('projects.index');
Route::get('/proyectos/{project:slug}', [PublicSiteController::class, 'project'])->name('projects.show');
Route::get('/quienes-somos', [PublicSiteController::class, 'about'])->name('about');
Route::get('/reuniones', [PublicSiteController::class, 'meetings'])->name('meetings');
Route::get('/enlaces', [PublicSiteController::class, 'links'])->name('links');
Route::get('/miembros', [PublicSiteController::class, 'members'])->name('members');
Route::get('/noticias', [PublicSiteController::class, 'news'])->name('news.index');
Route::get('/noticias/{newsPost:slug}', [PublicSiteController::class, 'newsShow'])->name('news.show');
Route::get('/contacto', [PublicSiteController::class, 'contact'])->name('contact');
Route::post('/contacto', [ContactController::class, 'store'])->middleware('throttle:5,1')->name('contact.store');
Route::post('/idioma', [LocaleController::class, 'update'])->name('locale.update');
Route::get('/sitemap.xml', SitemapController::class)->name('sitemap');
Route::get('/health', fn (): JsonResponse => response()->json(['status' => 'ok']))->name('health');

Route::middleware(['auth', 'verified', 'admin'])->prefix('admin')->group(function () {
    Route::get('/', [DashboardController::class, 'index'])->name('dashboard');

    Route::get('/proyectos', [ProjectController::class, 'index'])->name('admin.projects.index');
    Route::get('/proyectos/crear', [ProjectController::class, 'create'])->name('admin.projects.create');
    Route::post('/proyectos', [ProjectController::class, 'store'])->name('admin.projects.store');
    Route::get('/proyectos/{project}/editar', [ProjectController::class, 'edit'])->name('admin.projects.edit');
    Route::put('/proyectos/{project}', [ProjectController::class, 'update'])->name('admin.projects.update');
    Route::delete('/proyectos/{project}', [ProjectController::class, 'destroy'])->name('admin.projects.destroy');
    Route::delete('/proyectos/{project}/fotos/{photo}', [ProjectController::class, 'destroyPhoto'])->name('admin.projects.photos.destroy');

    Route::get('/miembros', [MemberController::class, 'index'])->name('admin.members.index');
    Route::get('/miembros/crear', [MemberController::class, 'create'])->name('admin.members.create');
    Route::post('/miembros', [MemberController::class, 'store'])->name('admin.members.store');
    Route::get('/miembros/{member}/editar', [MemberController::class, 'edit'])->name('admin.members.edit');
    Route::put('/miembros/{member}', [MemberController::class, 'update'])->name('admin.members.update');
    Route::delete('/miembros/{member}', [MemberController::class, 'destroy'])->name('admin.members.destroy');

    Route::get('/enlaces', [LinkController::class, 'index'])->name('admin.links.index');
    Route::get('/enlaces/crear', [LinkController::class, 'create'])->name('admin.links.create');
    Route::post('/enlaces', [LinkController::class, 'store'])->name('admin.links.store');
    Route::get('/enlaces/{link}/editar', [LinkController::class, 'edit'])->name('admin.links.edit');
    Route::put('/enlaces/{link}', [LinkController::class, 'update'])->name('admin.links.update');
    Route::delete('/enlaces/{link}', [LinkController::class, 'destroy'])->name('admin.links.destroy');

    Route::get('/noticias', [NewsController::class, 'index'])->name('admin.news.index');
    Route::get('/noticias/crear', [NewsController::class, 'create'])->name('admin.news.create');
    Route::post('/noticias', [NewsController::class, 'store'])->name('admin.news.store');
    Route::get('/noticias/{newsPost}/editar', [NewsController::class, 'edit'])->name('admin.news.edit');
    Route::put('/noticias/{newsPost}', [NewsController::class, 'update'])->name('admin.news.update');
    Route::delete('/noticias/{newsPost}', [NewsController::class, 'destroy'])->name('admin.news.destroy');

    Route::get('/eventos', [EventController::class, 'index'])->name('admin.events.index');
    Route::get('/eventos/crear', [EventController::class, 'create'])->name('admin.events.create');
    Route::post('/eventos', [EventController::class, 'store'])->name('admin.events.store');
    Route::get('/eventos/{event}/editar', [EventController::class, 'edit'])->name('admin.events.edit');
    Route::put('/eventos/{event}', [EventController::class, 'update'])->name('admin.events.update');
    Route::delete('/eventos/{event}', [EventController::class, 'destroy'])->name('admin.events.destroy');

    Route::get('/mensajes', [MessageController::class, 'index'])->name('admin.messages.index');
    Route::get('/mensajes/{message}', [MessageController::class, 'show'])->name('admin.messages.show');
    Route::delete('/mensajes/{message}', [MessageController::class, 'destroy'])->name('admin.messages.destroy');
});

require __DIR__.'/settings.php';
