<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\ContactMessage;
use App\Models\Event;
use App\Models\Member;
use App\Models\NewsPost;
use App\Models\Project;
use App\Models\UsefulLink;
use Inertia\Inertia;
use Inertia\Response;

class DashboardController extends Controller
{
    public function index(): Response
    {
        return Inertia::render('dashboard', [
            'counts' => [
                'projects' => Project::query()->count(),
                'news' => NewsPost::query()->count(),
                'events' => Event::query()->count(),
                'members' => Member::query()->count(),
                'links' => UsefulLink::query()->count(),
                'unread' => ContactMessage::query()->whereNull('read_at')->count(),
            ],
            'messages' => ContactMessage::query()->latest()->limit(5)->get()->map(fn (ContactMessage $message): array => [
                'id' => $message->id,
                'name' => $message->name,
                'email' => $message->email,
                'excerpt' => str($message->message)->limit(120)->toString(),
                'read' => $message->read_at !== null,
                'createdAt' => $message->created_at?->timezone((string) config('app.timezone'))->format('d/m/Y H:i'),
            ])->values(),
        ]);
    }
}
