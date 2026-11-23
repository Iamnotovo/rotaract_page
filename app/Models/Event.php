<?php

namespace App\Models;

use App\Models\Concerns\HasTranslations;
use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Carbon;

/**
 * @property int $id
 * @property array{es: string, en: string, ca: string} $title
 * @property array{es: string, en: string, ca: string}|null $description
 * @property Carbon $starts_at
 * @property Carbon|null $ends_at
 * @property string|null $location
 * @property string|null $maps_url
 * @property bool $published
 * @property Carbon|null $created_at
 * @property Carbon|null $updated_at
 */
#[Fillable(['title', 'description', 'starts_at', 'ends_at', 'location', 'maps_url', 'published'])]
class Event extends Model
{
    use HasTranslations;

    /**
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'title' => 'array',
            'description' => 'array',
            'starts_at' => 'datetime',
            'ends_at' => 'datetime',
            'published' => 'boolean',
        ];
    }

    /**
     * @param  Builder<Event>  $query
     * @return Builder<Event>
     */
    public function scopeUpcoming(Builder $query): Builder
    {
        return $query
            ->where('published', true)
            ->where('starts_at', '>=', now()->startOfDay())
            ->orderBy('starts_at');
    }

    /**
     * @return array{id: int, title: string, description: string, when: string, location: string|null, mapsUrl: string|null}
     */
    public function present(): array
    {
        $start = $this->starts_at;
        $when = $start->isoFormat('dddd D MMMM YYYY, HH:mm');

        if ($this->ends_at !== null) {
            $when .= ' – '.$this->ends_at->isoFormat('HH:mm');
        }

        return [
            'id' => $this->id,
            'title' => $this->translate('title'),
            'description' => $this->translate('description'),
            'when' => $when,
            'location' => $this->location,
            'mapsUrl' => $this->maps_url,
        ];
    }
}
