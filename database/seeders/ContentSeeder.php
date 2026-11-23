<?php

namespace Database\Seeders;

use App\Models\Member;
use App\Models\Project;
use App\Models\UsefulLink;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;

class ContentSeeder extends Seeder
{
    public function run(): void
    {
        $base = $this->read('site-data.json');
        $spanish = $this->read('site-es.json');
        $catalan = $this->read('site-ca.json');

        $this->seedProjects($base, $spanish, $catalan);
        $this->seedMembers($base);
        $this->seedLinks($base, $spanish, $catalan);
    }

    /**
     * @param  array<string, mixed>  $base
     * @param  array<string, mixed>  $spanish
     * @param  array<string, mixed>  $catalan
     */
    private function seedProjects(array $base, array $spanish, array $catalan): void
    {
        $projects = $this->listOf($base, 'projects');

        foreach ($projects as $index => $project) {
            $key = $this->stringValue($project, 'i18nKey');
            $title = $this->trio($project, $this->nested($spanish, 'siteProjects', $key), $this->nested($catalan, 'siteProjects', $key), 'title');
            $slug = Str::slug($title['es']);

            if ($slug === '') {
                $slug = 'proyecto-'.($index + 1);
            }

            Project::query()->updateOrCreate(
                ['slug' => $slug],
                [
                    'title' => $title,
                    'description' => $this->trio($project, $this->nested($spanish, 'siteProjects', $key), $this->nested($catalan, 'siteProjects', $key), 'description'),
                    'what_done' => $this->trio($project, $this->nested($spanish, 'siteProjects', $key), $this->nested($catalan, 'siteProjects', $key), 'whatDone'),
                    'what_learned' => $this->trio($project, $this->nested($spanish, 'siteProjects', $key), $this->nested($catalan, 'siteProjects', $key), 'whatLearned'),
                    'main_photo' => $this->stringValue($project, 'mainPhoto') ?: null,
                    'main_photo_position' => $this->stringValue($project, 'mainPhotoPosition', '50% 50%'),
                    'pinned' => (bool) ($project['pinned'] ?? false),
                    'sort_order' => $index,
                    'published' => true,
                ],
            );
        }
    }

    /**
     * @param  array<string, mixed>  $base
     */
    private function seedMembers(array $base): void
    {
        $roles = [
            'President' => 'president',
            'Vice President' => 'vicePresident',
            'Treasurer' => 'treasurer',
            'Secretary' => 'secretary',
            'Member' => 'member',
            'Social Networks Manager' => 'socialNetworksManager',
        ];

        $created = [];

        foreach ($this->listOf($base, 'members') as $index => $member) {
            $englishRole = $this->stringValue($member, 'role', 'Member');
            $model = Member::query()->updateOrCreate(
                ['name' => trim($this->stringValue($member, 'name'))],
                [
                    'role' => $roles[$englishRole] ?? 'member',
                    'photo' => $this->stringValue($member, 'photo') ?: null,
                    'sort_order' => $index,
                    'board_order' => null,
                ],
            );

            $oldId = $this->stringValue($member, 'id');

            if ($oldId !== '') {
                $created[$oldId] = $model;
            }
        }

        foreach ($this->listOf($base, 'directionSlots') as $position => $slot) {
            $id = $this->stringValue($slot, 'id');
            $member = $created[$id] ?? null;

            if ($member instanceof Member) {
                $member->update(['board_order' => $position]);
            }
        }
    }

    /**
     * @param  array<string, mixed>  $base
     * @param  array<string, mixed>  $spanish
     * @param  array<string, mixed>  $catalan
     */
    private function seedLinks(array $base, array $spanish, array $catalan): void
    {
        foreach ($this->listOf($base, 'usefulLinks') as $index => $link) {
            $key = $this->stringValue($link, 'i18nKey');
            $url = $this->stringValue($link, 'url');

            if ($url === '') {
                continue;
            }

            UsefulLink::query()->updateOrCreate(
                ['url' => $url],
                [
                    'title' => $this->trio($link, $this->nested($spanish, 'siteLinks', $key), $this->nested($catalan, 'siteLinks', $key), 'title'),
                    'description' => $this->trio($link, $this->nested($spanish, 'siteLinks', $key), $this->nested($catalan, 'siteLinks', $key), 'description'),
                    'sort_order' => $index,
                ],
            );
        }
    }

    /**
     * @return array<string, mixed>
     */
    private function read(string $filename): array
    {
        $decoded = json_decode((string) file_get_contents(database_path('data/'.$filename)), true);

        if (! is_array($decoded)) {
            return [];
        }

        /** @var array<string, mixed> $decoded */
        return $decoded;
    }

    /**
     * @param  array<string, mixed>  $source
     * @return list<array<string, mixed>>
     */
    private function listOf(array $source, string $key): array
    {
        $value = $source[$key] ?? [];

        if (! is_array($value)) {
            return [];
        }

        $items = [];

        foreach ($value as $item) {
            if (is_array($item)) {
                /** @var array<string, mixed> $item */
                $items[] = $item;

                continue;
            }

            if (is_string($item)) {
                $items[] = ['id' => $item];
            }
        }

        return $items;
    }

    /**
     * @param  array<string, mixed>  $source
     * @return array<string, mixed>
     */
    private function nested(array $source, string $group, string $key): array
    {
        $groupValue = $source[$group] ?? [];

        if (! is_array($groupValue) || $key === '') {
            return [];
        }

        $item = $groupValue[$key] ?? [];

        if (! is_array($item)) {
            return [];
        }

        /** @var array<string, mixed> $item */
        return $item;
    }

    /**
     * @param  array<string, mixed>  $english
     * @param  array<string, mixed>  $spanish
     * @param  array<string, mixed>  $catalan
     * @return array{es: string, en: string, ca: string}
     */
    private function trio(array $english, array $spanish, array $catalan, string $key): array
    {
        $en = $this->stringValue($english, $key);
        $es = $this->stringValue($spanish, $key, $en);
        $ca = $this->stringValue($catalan, $key, $es !== '' ? $es : $en);

        return ['es' => $es, 'en' => $en, 'ca' => $ca];
    }

    /**
     * @param  array<string, mixed>  $source
     */
    private function stringValue(array $source, string $key, string $default = ''): string
    {
        $value = $source[$key] ?? $default;

        return is_string($value) ? $value : $default;
    }
}
