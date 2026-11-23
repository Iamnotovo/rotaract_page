<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\ContactMessage;
use Illuminate\Http\RedirectResponse;
use Inertia\Inertia;
use Inertia\Response;

class MessageController extends Controller
{
    public function index(): Response
    {
        return Inertia::render('admin/messages/index', [
            'messages' => ContactMessage::query()->latest()->paginate(20)->through(fn (ContactMessage $message): array => [
                'id' => $message->id,
                'name' => $message->name,
                'email' => $message->email,
                'excerpt' => str($message->message)->limit(140)->toString(),
                'read' => $message->read_at !== null,
                'createdAt' => $message->created_at?->timezone((string) config('app.timezone'))->format('d/m/Y H:i'),
            ]),
        ]);
    }

    public function show(ContactMessage $message): Response
    {
        if ($message->read_at === null) {
            $message->forceFill(['read_at' => now()])->save();
        }

        return Inertia::render('admin/messages/show', [
            'message' => [
                'id' => $message->id,
                'name' => $message->name,
                'email' => $message->email,
                'body' => $message->message,
                'createdAt' => $message->created_at?->timezone((string) config('app.timezone'))->format('d/m/Y H:i'),
            ],
        ]);
    }

    public function destroy(ContactMessage $message): RedirectResponse
    {
        $message->delete();

        Inertia::flash('toast', ['type' => 'success', 'message' => 'Mensaje eliminado.']);

        return to_route('admin.messages.index');
    }
}
