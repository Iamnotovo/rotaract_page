<?php

namespace App\Http\Controllers;

use App\Models\NewsPost;
use App\Models\Project;
use Illuminate\Http\Response;

class SitemapController extends Controller
{
    public function __invoke(): Response
    {
        $urls = [
            route('home'),
            route('projects.index'),
            route('about'),
            route('meetings'),
            route('members'),
            route('links'),
            route('news.index'),
            route('contact'),
        ];

        foreach (Project::query()->published()->ordered()->get() as $project) {
            $urls[] = route('projects.show', $project);
        }

        foreach (NewsPost::query()->published()->get() as $post) {
            $urls[] = route('news.show', $post);
        }

        $body = collect($urls)
            ->map(fn (string $url): string => '  <url><loc>'.e($url).'</loc></url>')
            ->implode("\n");

        return response(
            <<<XML
            <?xml version="1.0" encoding="UTF-8"?>
            <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
            {$body}
            </urlset>
            XML,
            200,
            ['Content-Type' => 'application/xml; charset=UTF-8'],
        );
    }
}
