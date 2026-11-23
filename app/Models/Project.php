<?php

namespace App\Models;

use App\Models\Concerns\HasTranslations;
use App\Support\Media;
use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Support\Carbon;

/**
 * @property int $id
 * @property string $slug
 * @property array{es: string, en: string, ca: string} $title
 * @property array{es: string, en: string, ca: string} $description
 * @property array{es: string, en: string, ca: string} $what_done
 * @property array{es: string, en: string, ca: string} $what_learned
 * @property string|null $main_photo
 * @property string $main_photo_position
 * @property bool $pinned
 * @property int $sort_order
 * @property bool $published
 * @property Carbon|null $created_at
 * @property Carbon|null $updated_at
 */
#[Fillable([
    'slug',
    'title',
    'description',
    'what_done',
    'what_learned',
    'main_photo',
    'main_photo_position',
    'pinned',
    'sort_order',
    'published',
])]
class Project extends Model
{
    use HasTranslations;

    protected static function booted(): void
    {
        static::deleting(function (Project $project): void {
            Media::delete($project->main_photo);

            $project->photos->each(function (ProjectPhoto $photo): void {
                Media::delete($photo->path);
            });
        });
    }

    /**
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'title' => 'array',
            'description' => 'array',
            'what_done' => 'array',
            'what_learned' => 'array',
            'pinned' => 'boolean',
            'published' => 'boolean',
        ];
    }

    /**
     * @return HasMany<ProjectPhoto, $this>
     */
    public function photos(): HasMany
    {
        return $this->hasMany(ProjectPhoto::class)->orderBy('sort_order');
    }

    /**
     * @param  Builder<Project>  $query
     * @return Builder<Project>
     */
    public function scopePublished(Builder $query): Builder
    {
        return $query->where('published', true);
    }

    /**
     * @param  Builder<Project>  $query
     * @return Builder<Project>
     */
    public function scopeOrdered(Builder $query): Builder
    {
        return $query->orderByDesc('pinned')->orderBy('sort_order');
    }

    /**
     * @return array{slug: string, title: string, description: string, photo: string|null, photoPosition: string, pinned: bool}
     */
    public function presentCard(): array
    {
        return [
            'slug' => $this->slug,
            'title' => $this->translate('title'),
            'description' => $this->translate('description'),
            'photo' => Media::url($this->main_photo),
            'photoPosition' => $this->main_photo_position !== '' ? $this->main_photo_position : '50% 50%',
            'pinned' => $this->pinned,
        ];
    }

    /**
     * @return array{slug: string, title: string, description: string, photo: string|null, photoPosition: string, pinned: bool, whatDone: string, whatLearned: string, gallery: list<array{id: int, url: string|null}>}
     */
    public function presentDetail(): array
    {
        $gallery = [];

        foreach ($this->photos as $photo) {
            $gallery[] = [
                'id' => $photo->id,
                'url' => Media::url($photo->path),
            ];
        }

        return [
            ...$this->presentCard(),
            'whatDone' => $this->translate('what_done'),
            'whatLearned' => $this->translate('what_learned'),
            'gallery' => $gallery,
        ];
    }
}
