<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\UsefulLink;
use App\Support\Translations;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class LinkController extends Controller
{
    public function index(): Response
    {
        return Inertia::render('admin/links/index', [
            'links' => UsefulLink::query()->ordered()->get()->map->present()->values(),
        ]);
    }

    public function create(): Response
    {
        return Inertia::render('admin/links/form', ['link' => null]);
    }

    public function store(Request $request): RedirectResponse
    {
        $link = UsefulLink::query()->create([
            ...$this->attributes($request),
            'sort_order' => (int) UsefulLink::query()->max('sort_order') + 1,
        ]);

        Inertia::flash('toast', ['type' => 'success', 'message' => 'Enlace creado.']);

        return to_route('admin.links.edit', $link);
    }

    public function edit(UsefulLink $link): Response
    {
        return Inertia::render('admin/links/form', [
            'link' => [
                'id' => $link->id,
                'title' => $link->translationSet('title'),
                'description' => $link->translationSet('description'),
                'url' => $link->url,
                'sortOrder' => $link->sort_order,
            ],
        ]);
    }

    public function update(Request $request, UsefulLink $link): RedirectResponse
    {
        $link->update($this->attributes($request));

        Inertia::flash('toast', ['type' => 'success', 'message' => 'Enlace actualizado.']);

        return to_route('admin.links.edit', $link);
    }

    public function destroy(UsefulLink $link): RedirectResponse
    {
        $link->delete();

        Inertia::flash('toast', ['type' => 'success', 'message' => 'Enlace eliminado.']);

        return to_route('admin.links.index');
    }

    /**
     * @return array<string, mixed>
     */
    private function attributes(Request $request): array
    {
        $validated = $request->validate([
            ...Translations::rules('title', true, 160),
            ...Translations::rules('description', false, 1000),
            'url' => ['required', 'string', 'max:500', function (string $attribute, mixed $value, \Closure $fail): void {
                if (! is_string($value)) {
                    $fail('La URL no es válida.');

                    return;
                }

                if (str_starts_with(strtolower($value), 'mailto:')) {
                    if (! filter_var(substr($value, 7), FILTER_VALIDATE_EMAIL)) {
                        $fail('El correo del enlace no es válido.');
                    }

                    return;
                }

                if (filter_var($value, FILTER_VALIDATE_URL) === false) {
                    $fail('La URL no es válida.');
                }
            }],
            'sort_order' => ['nullable', 'integer', 'min:0', 'max:1000'],
        ]);

        return [
            'title' => Translations::from($validated, 'title'),
            'description' => Translations::from($validated, 'description'),
            'url' => $validated['url'],
            'sort_order' => isset($validated['sort_order']) ? (int) $validated['sort_order'] : 0,
        ];
    }
}
