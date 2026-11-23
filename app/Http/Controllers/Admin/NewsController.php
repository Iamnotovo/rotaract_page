<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\NewsPost;
use App\Support\Media;
use App\Support\Translations;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Http\UploadedFile;
use Inertia\Inertia;
use Inertia\Response;

class NewsController extends Controller
{
    public function index(): Response
    {
        return Inertia::render('admin/news/index', [
            'posts' => NewsPost::query()->latest()->get()->map(fn (NewsPost $post): array => [
                'id' => $post->id,
                'title' => $post->translate('title'),
                'publishedAt' => $post->published_at?->format('d/m/Y'),
                'published' => $post->published_at !== null,
            ])->values(),
        ]);
    }

    public function create(): Response
    {
        return Inertia::render('admin/news/form', ['post' => null]);
    }

    public function store(Request $request): RedirectResponse
    {
        $attributes = $this->attributes($request);
        $post = new NewsPost($attributes);
        $post->slug = Translations::uniqueSlug(
            $attributes['title']['es'],
            fn (string $slug): bool => NewsPost::query()->where('slug', $slug)->exists(),
            'noticia',
        );
        $this->fillPhoto($request, $post);
        $post->save();

        Inertia::flash('toast', ['type' => 'success', 'message' => 'Noticia creada.']);

        return to_route('admin.news.edit', $post);
    }

    public function edit(NewsPost $newsPost): Response
    {
        return Inertia::render('admin/news/form', [
            'post' => [
                'id' => $newsPost->id,
                'title' => $newsPost->translationSet('title'),
                'excerpt' => $newsPost->translationSet('excerpt'),
                'body' => $newsPost->translationSet('body'),
                'cover' => Media::url($newsPost->cover_photo),
                'publishedAt' => $newsPost->published_at?->format('Y-m-d\TH:i'),
                'published' => $newsPost->published_at !== null,
            ],
        ]);
    }

    public function update(Request $request, NewsPost $newsPost): RedirectResponse
    {
        $newsPost->fill($this->attributes($request));
        $this->fillPhoto($request, $newsPost);
        $newsPost->save();

        Inertia::flash('toast', ['type' => 'success', 'message' => 'Noticia actualizada.']);

        return to_route('admin.news.edit', $newsPost);
    }

    public function destroy(NewsPost $newsPost): RedirectResponse
    {
        $newsPost->delete();

        Inertia::flash('toast', ['type' => 'success', 'message' => 'Noticia eliminada.']);

        return to_route('admin.news.index');
    }

    /**
     * @return array<string, mixed>
     */
    private function attributes(Request $request): array
    {
        $validated = $request->validate([
            ...Translations::rules('title', true, 200),
            ...Translations::rules('excerpt', false, 400),
            ...Translations::rules('body', true, 20000),
            'published_at' => ['nullable', 'date'],
            'cover' => ['nullable', 'image', 'max:5120'],
        ]);

        $publishedAt = $validated['published_at'] ?? null;

        if ($request->boolean('published') && ! is_string($publishedAt)) {
            $publishedAt = now();
        }

        if (! $request->boolean('published')) {
            $publishedAt = null;
        }

        return [
            'title' => Translations::from($validated, 'title'),
            'excerpt' => Translations::from($validated, 'excerpt'),
            'body' => Translations::from($validated, 'body'),
            'published_at' => $publishedAt,
        ];
    }

    private function fillPhoto(Request $request, NewsPost $post): void
    {
        $file = $request->file('cover');

        if (! $file instanceof UploadedFile) {
            return;
        }

        Media::delete($post->cover_photo);
        $post->cover_photo = Media::store($file, 'uploads/news');
    }
}
