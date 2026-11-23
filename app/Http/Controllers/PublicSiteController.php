<?php

namespace App\Http\Controllers;

use App\Models\Event;
use App\Models\Member;
use App\Models\NewsPost;
use App\Models\Project;
use App\Models\UsefulLink;
use App\Support\SiteTranslator;
use Inertia\Inertia;
use Inertia\Response;

class PublicSiteController extends Controller
{
    public function home(): Response
    {
        return $this->page('public/home', [
            'featured' => Project::query()->published()->ordered()->limit(3)->get()->map->presentCard()->values(),
        ], '', 'extras.metaHome');
    }

    public function projects(): Response
    {
        return $this->page('public/projects', [
            'projects' => Project::query()->published()->ordered()->get()->map->presentCard()->values(),
        ], 'projectsPage.pageTitle', 'extras.metaProjects');
    }

    public function project(Project $project): Response
    {
        abort_unless($project->published, 404);

        $project->load('photos');

        return $this->page('public/project', [
            'project' => $project->presentDetail(),
        ], '', 'extras.metaProjects', $project->translate('title'));
    }

    public function about(): Response
    {
        return $this->page('public/about', [], 'about.pageTitle', 'extras.metaAbout');
    }

    public function meetings(): Response
    {
        $query = rawurlencode((string) config('club.maps_query'));

        return $this->page('public/meetings', [
            'address' => config('club.address'),
            'mapEmbed' => 'https://www.google.com/maps?q='.$query.'&output=embed',
            'mapLink' => 'https://www.google.com/maps/search/?api=1&query='.$query,
            'events' => Event::query()->upcoming()->get()->map->present()->values(),
        ], 'meetings.pageTitle', 'extras.metaMeetings');
    }

    public function links(): Response
    {
        return $this->page('public/links', [
            'links' => UsefulLink::query()->ordered()->get()->map->present()->values(),
        ], 'linksPage.pageTitle', 'extras.metaLinks');
    }

    public function members(): Response
    {
        $members = Member::query()->ordered()->get();

        return $this->page('public/members', [
            'board' => $members
                ->filter(fn (Member $member): bool => $member->board_order !== null)
                ->sortBy('board_order')
                ->map->present()
                ->values(),
            'members' => $members
                ->filter(fn (Member $member): bool => $member->board_order === null)
                ->map->present()
                ->values(),
        ], 'membersPage.pageTitle', 'extras.metaMembers');
    }

    public function news(): Response
    {
        return $this->page('public/news', [
            'posts' => NewsPost::query()->published()->latest('published_at')->get()->map->presentCard()->values(),
        ], 'extras.news', 'extras.metaNews');
    }

    public function newsShow(NewsPost $newsPost): Response
    {
        abort_unless($newsPost->published_at !== null && $newsPost->published_at->lte(now()), 404);

        return $this->page('public/news-show', [
            'post' => $newsPost->presentDetail(),
        ], '', 'extras.metaNews', $newsPost->translate('title'));
    }

    public function contact(): Response
    {
        return $this->page('public/contact', [], 'extras.contact', 'extras.metaContact');
    }

    /**
     * @param  array<string, mixed>  $props
     */
    private function page(string $component, array $props, string $titleKey, string $descriptionKey, ?string $explicitTitle = null): Response
    {
        $translator = app(SiteTranslator::class);
        $name = (string) config('app.name');
        $pageTitle = $explicitTitle ?? ($titleKey === '' ? $name : $translator->get($titleKey));
        $fullTitle = $pageTitle === $name ? $name : $pageTitle.' — '.$name;

        return Inertia::render($component, [
            ...$props,
            'seo' => [
                'title' => $fullTitle,
                'page' => $pageTitle,
                'description' => $translator->get($descriptionKey),
            ],
        ]);
    }
}
