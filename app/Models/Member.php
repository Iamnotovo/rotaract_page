<?php

namespace App\Models;

use App\Support\Media;
use App\Support\SiteTranslator;
use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Carbon;

/**
 * @property int $id
 * @property string $name
 * @property string $role
 * @property string|null $photo
 * @property int $sort_order
 * @property int|null $board_order
 * @property Carbon|null $created_at
 * @property Carbon|null $updated_at
 */
#[Fillable(['name', 'role', 'photo', 'sort_order', 'board_order'])]
class Member extends Model
{
    public const ROLES = [
        'president',
        'vicePresident',
        'treasurer',
        'secretary',
        'socialNetworksManager',
        'member',
    ];

    protected static function booted(): void
    {
        static::deleting(function (Member $member): void {
            Media::delete($member->photo);
        });
    }

    /**
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'board_order' => 'integer',
        ];
    }

    /**
     * @param  Builder<Member>  $query
     * @return Builder<Member>
     */
    public function scopeOrdered(Builder $query): Builder
    {
        return $query->orderBy('sort_order')->orderBy('name');
    }

    /**
     * @return array{id: int, name: string, role: string, roleLabel: string, photo: string|null, boardOrder: int|null}
     */
    public function present(): array
    {
        $translator = app(SiteTranslator::class);
        $label = in_array($this->role, self::ROLES, true)
            ? $translator->get('memberRoles.'.$this->role)
            : $this->role;

        return [
            'id' => $this->id,
            'name' => $this->name,
            'role' => $this->role,
            'roleLabel' => $label,
            'photo' => Media::url($this->photo),
            'boardOrder' => $this->board_order,
        ];
    }
}
