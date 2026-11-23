<?php

namespace App\Models;

use App\Models\Concerns\HasTranslations;
use App\Support\Media;
use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Carbon;

/**
 * @property int $id
 * @property string $slug
 * @property array{es: string, en: string, ca: string} $title
 * @property array{es: string, en: string, ca: string}|null $excerpt
 * @property array{es: string, en: string, ca: string} $body
 * @property string|null $cover_photo
 * @property Carbon|null $published_at
 * @property Carbon|null $created_at
 * @property Carbon|null $updated_at
 */
#[Fillable(['slug', 'title', 'excerpt', 'body', 'cover_photo', 'published_at'])]
class NewsPost extends Model
{
    use HasTranslations;

    protected static function booted(): void
    {
        static::deleting(function (NewsPost $post): void {
            Media::delete($post->cover_photo);
        });
    }

    /**
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'title' => 'array',
            'excerpt' => 'array',
            'body' => 'array',
            'published_at' => 'datetime',
        ];
    }

    /**
     * @param  Builder<NewsPost>  $query
     * @return Builder<NewsPost>
     */
    public function scopePublished(Builder $query): Builder
    {
        return $query->whereNotNull('published_at')->where('published_at', '<=', now());
    }

    /**
     * @return array{slug: string, title: string, excerpt: string, cover: string|null, publishedAt: string|null}
     */
    public function presentCard(): array
    {
        $excerpt = $this->translate('excerpt');

        if ($excerpt === '') {
            $excerpt = str($this->translate('body'))->limit(180)->toString();
        }

        return [
            'slug' => $this->slug,
            'title' => $this->translate('title'),
            'excerpt' => $excerpt,
            'cover' => Media::url($this->cover_photo),
            'publishedAt' => $this->published_at?->isoFormat('D MMMM YYYY'),
        ];
    }

    /**
     * @return array{slug: string, title: string, excerpt: string, cover: string|null, publishedAt: string|null, body: string}
     */
    public function presentDetail(): array
    {
        return [
            ...$this->presentCard(),
            'body' => $this->translate('body'),
        ];
    }
}
