<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Project;
use App\Models\ProjectPhoto;
use App\Support\Media;
use App\Support\Translations;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Http\UploadedFile;
use Inertia\Inertia;
use Inertia\Response;

class ProjectController extends Controller
{
    public function index(): Response
    {
        return Inertia::render('admin/projects/index', [
            'projects' => Project::query()->ordered()->get()->map(fn (Project $project): array => [
                'id' => $project->id,
                'title' => $project->translate('title'),
                'pinned' => $project->pinned,
                'published' => $project->published,
                'photo' => Media::url($project->main_photo),
            ])->values(),
        ]);
    }

    public function create(): Response
    {
        return Inertia::render('admin/projects/form', [
            'project' => null,
        ]);
    }

    public function store(Request $request): RedirectResponse
    {
        $project = new Project($this->attributes($request));
        $project->slug = Translations::uniqueSlug(
            $project->title['es'],
            fn (string $slug): bool => Project::query()->where('slug', $slug)->exists(),
            'proyecto',
        );
        $project->sort_order = (int) Project::query()->max('sort_order') + 1;
        $this->fillPhoto($request, $project);
        $project->save();
        $this->storeGallery($request, $project);

        Inertia::flash('toast', ['type' => 'success', 'message' => 'Proyecto creado.']);

        return to_route('admin.projects.edit', $project);
    }

    public function edit(Project $project): Response
    {
        $project->load('photos');

        return Inertia::render('admin/projects/form', [
            'project' => [
                'id' => $project->id,
                'title' => $project->translationSet('title'),
                'description' => $project->translationSet('description'),
                'whatDone' => $project->translationSet('what_done'),
                'whatLearned' => $project->translationSet('what_learned'),
                'photoPosition' => $project->main_photo_position,
                'photo' => Media::url($project->main_photo),
                'pinned' => $project->pinned,
                'published' => $project->published,
                'gallery' => $project->photos->map(fn (ProjectPhoto $photo): array => [
                    'id' => $photo->id,
                    'url' => Media::url($photo->path),
                ])->values(),
            ],
        ]);
    }

    public function update(Request $request, Project $project): RedirectResponse
    {
        $project->fill($this->attributes($request));
        $this->fillPhoto($request, $project);
        $project->save();
        $this->storeGallery($request, $project);

        Inertia::flash('toast', ['type' => 'success', 'message' => 'Proyecto actualizado.']);

        return to_route('admin.projects.edit', $project);
    }

    public function destroy(Project $project): RedirectResponse
    {
        $project->delete();

        Inertia::flash('toast', ['type' => 'success', 'message' => 'Proyecto eliminado.']);

        return to_route('admin.projects.index');
    }

    public function destroyPhoto(Project $project, ProjectPhoto $photo): RedirectResponse
    {
        abort_unless($photo->project_id === $project->id, 404);

        Media::delete($photo->path);
        $photo->delete();

        return to_route('admin.projects.edit', $project);
    }

    /**
     * @return array<string, mixed>
     */
    private function attributes(Request $request): array
    {
        $validated = $request->validate([
            ...Translations::rules('title', true, 200),
            ...Translations::rules('description', true, 8000),
            ...Translations::rules('what_done', false, 12000),
            ...Translations::rules('what_learned', false, 12000),
            'main_photo_position' => ['nullable', 'regex:/^\d{1,3}% \d{1,3}%$/'],
            'main_photo' => ['nullable', 'image', 'max:5120'],
            'gallery' => ['nullable', 'array', 'max:12'],
            'gallery.*' => ['image', 'max:5120'],
        ]);

        $position = $validated['main_photo_position'] ?? '50% 50%';

        return [
            'title' => Translations::from($validated, 'title'),
            'description' => Translations::from($validated, 'description'),
            'what_done' => Translations::from($validated, 'what_done'),
            'what_learned' => Translations::from($validated, 'what_learned'),
            'main_photo_position' => is_string($position) && $position !== '' ? $position : '50% 50%',
            'pinned' => $request->boolean('pinned'),
            'published' => $request->boolean('published'),
        ];
    }

    private function fillPhoto(Request $request, Project $project): void
    {
        $file = $request->file('main_photo');

        if (! $file instanceof UploadedFile) {
            return;
        }

        Media::delete($project->main_photo);
        $project->main_photo = Media::store($file, 'uploads/projects');
    }

    private function storeGallery(Request $request, Project $project): void
    {
        $files = $request->file('gallery', []);

        if (! is_array($files)) {
            return;
        }

        $order = (int) $project->photos()->max('sort_order');

        foreach ($files as $file) {
            $order++;
            $project->photos()->create([
                'path' => Media::store($file, 'uploads/projects'),
                'sort_order' => $order,
            ]);
        }
    }
}
