<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Event;
use App\Support\Translations;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class EventController extends Controller
{
    public function index(): Response
    {
        return Inertia::render('admin/events/index', [
            'events' => Event::query()->orderBy('starts_at')->get()->map(fn (Event $event): array => [
                'id' => $event->id,
                'title' => $event->translate('title'),
                'when' => $event->starts_at->format('d/m/Y H:i'),
                'published' => $event->published,
            ])->values(),
        ]);
    }

    public function create(): Response
    {
        return Inertia::render('admin/events/form', ['event' => null]);
    }

    public function store(Request $request): RedirectResponse
    {
        $event = Event::query()->create($this->attributes($request));

        Inertia::flash('toast', ['type' => 'success', 'message' => 'Actividad creada.']);

        return to_route('admin.events.edit', $event);
    }

    public function edit(Event $event): Response
    {
        return Inertia::render('admin/events/form', [
            'event' => [
                'id' => $event->id,
                'title' => $event->translationSet('title'),
                'description' => $event->translationSet('description'),
                'startsAt' => $event->starts_at->format('Y-m-d\TH:i'),
                'endsAt' => $event->ends_at?->format('Y-m-d\TH:i'),
                'location' => $event->location ?? '',
                'mapsUrl' => $event->maps_url ?? '',
                'published' => $event->published,
            ],
        ]);
    }

    public function update(Request $request, Event $event): RedirectResponse
    {
        $event->update($this->attributes($request));

        Inertia::flash('toast', ['type' => 'success', 'message' => 'Actividad actualizada.']);

        return to_route('admin.events.edit', $event);
    }

    public function destroy(Event $event): RedirectResponse
    {
        $event->delete();

        Inertia::flash('toast', ['type' => 'success', 'message' => 'Actividad eliminada.']);

        return to_route('admin.events.index');
    }

    /**
     * @return array<string, mixed>
     */
    private function attributes(Request $request): array
    {
        $validated = $request->validate([
            ...Translations::rules('title', true, 200),
            ...Translations::rules('description', false, 5000),
            'starts_at' => ['required', 'date'],
            'ends_at' => ['nullable', 'date', 'after_or_equal:starts_at'],
            'location' => ['nullable', 'string', 'max:255'],
            'maps_url' => ['nullable', 'url', 'max:500'],
        ]);

        return [
            'title' => Translations::from($validated, 'title'),
            'description' => Translations::from($validated, 'description'),
            'starts_at' => $validated['starts_at'],
            'ends_at' => $validated['ends_at'] ?? null,
            'location' => $validated['location'] ?? null,
            'maps_url' => $validated['maps_url'] ?? null,
            'published' => $request->boolean('published'),
        ];
    }
}
