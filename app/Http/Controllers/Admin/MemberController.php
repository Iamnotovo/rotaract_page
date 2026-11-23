<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Member;
use App\Support\Media;
use App\Support\SiteTranslator;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Http\UploadedFile;
use Illuminate\Validation\Rule;
use Inertia\Inertia;
use Inertia\Response;

class MemberController extends Controller
{
    public function index(): Response
    {
        return Inertia::render('admin/members/index', [
            'members' => Member::query()->ordered()->get()->map->present()->values(),
        ]);
    }

    public function create(): Response
    {
        return Inertia::render('admin/members/form', [
            'member' => null,
            'roles' => $this->roles(),
        ]);
    }

    public function store(Request $request): RedirectResponse
    {
        $data = $this->validated($request);
        $member = new Member($data);
        $member->sort_order = (int) Member::query()->max('sort_order') + 1;
        $this->fillPhoto($request, $member);
        $member->save();
        $this->claimBoardSlot($member);

        Inertia::flash('toast', ['type' => 'success', 'message' => 'Miembro añadido.']);

        return to_route('admin.members.edit', $member);
    }

    public function edit(Member $member): Response
    {
        return Inertia::render('admin/members/form', [
            'member' => [
                ...$member->present(),
                'sortOrder' => $member->sort_order,
            ],
            'roles' => $this->roles(),
        ]);
    }

    public function update(Request $request, Member $member): RedirectResponse
    {
        $member->fill($this->validated($request));
        $this->fillPhoto($request, $member);
        $member->save();
        $this->claimBoardSlot($member);

        Inertia::flash('toast', ['type' => 'success', 'message' => 'Miembro actualizado.']);

        return to_route('admin.members.edit', $member);
    }

    public function destroy(Member $member): RedirectResponse
    {
        $member->delete();

        Inertia::flash('toast', ['type' => 'success', 'message' => 'Miembro eliminado.']);

        return to_route('admin.members.index');
    }

    /**
     * @return array<string, mixed>
     */
    private function validated(Request $request): array
    {
        $data = $request->validate([
            'name' => ['required', 'string', 'max:120'],
            'role' => ['required', Rule::in(Member::ROLES)],
            'photo' => ['nullable', 'image', 'max:5120'],
            'sort_order' => ['nullable', 'integer', 'min:0', 'max:1000'],
            'board_order' => ['nullable', 'integer', 'min:0', 'max:11'],
        ]);

        return [
            'name' => $data['name'],
            'role' => $data['role'],
            'sort_order' => isset($data['sort_order']) ? (int) $data['sort_order'] : 0,
            'board_order' => isset($data['board_order']) ? (int) $data['board_order'] : null,
        ];
    }

    private function fillPhoto(Request $request, Member $member): void
    {
        $file = $request->file('photo');

        if (! $file instanceof UploadedFile) {
            return;
        }

        Media::delete($member->photo);
        $member->photo = Media::store($file, 'uploads/members');
    }

    private function claimBoardSlot(Member $member): void
    {
        if ($member->board_order === null) {
            return;
        }

        Member::query()
            ->where('board_order', $member->board_order)
            ->whereKeyNot($member->id)
            ->update(['board_order' => null]);
    }

    /**
     * @return list<array{value: string, label: string}>
     */
    private function roles(): array
    {
        $roles = [];

        foreach (Member::ROLES as $role) {
            $roles[] = [
                'value' => $role,
                'label' => app(SiteTranslator::class)->get('memberRoles.'.$role),
            ];
        }

        return $roles;
    }
}
