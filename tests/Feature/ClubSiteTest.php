<?php

namespace Tests\Feature;

use App\Models\ContactMessage;
use App\Models\Event;
use App\Models\Member;
use App\Models\NewsPost;
use App\Models\Project;
use App\Models\User;
use Database\Seeders\ContentSeeder;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Inertia\Testing\AssertableInertia as Assert;
use Tests\TestCase;

class ClubSiteTest extends TestCase
{
    use RefreshDatabase;

    public function test_public_pages_show_the_spanish_club_content(): void
    {
        $this->seed(ContentSeeder::class);

        $this->get('/')->assertOk()
            ->assertSee('Rotaract Club Barcelona Diagonal')
            ->assertSee('Venta de rosas en Sant Jordi')
            ->assertSee('Puedo unirme a Rotaract');

        $this->get('/proyectos')->assertOk()->assertSee('Gran Recapte');
        $this->get('/proyectos/venta-de-rosas-en-sant-jordi')->assertOk()->assertSee('TRIQ');
        $this->get('/quienes-somos')->assertOk()->assertSee('abril de 2024');
        $this->get('/reuniones')->assertOk()->assertSee('Carrer de Bruc 147')->assertSee('20:30');
        $this->get('/miembros')->assertOk()->assertSee('Andrea Anguita')->assertSee('Presidente');
        $this->get('/enlaces')->assertOk()->assertInertia(fn (Assert $page) => $page
            ->component('public/links')
            ->where('links.0.url', 'https://www.instagram.com/rotaractdiagonal/'));
        $this->get('/noticias')->assertOk()->assertSee('no hay noticias publicadas');
        $this->get('/contacto')->assertOk()->assertSee('Formulario');
        $this->get('/sitemap.xml')->assertOk()->assertSee('/proyectos/venta-de-rosas-en-sant-jordi');
        $this->get('/health')->assertOk()->assertJson(['status' => 'ok']);
    }

    public function test_english_locale_uses_the_cookie(): void
    {
        $this->seed(ContentSeeder::class);

        $this->disableCookieEncryption()
            ->withCookie('locale', 'en')
            ->get('/')
            ->assertOk()
            ->assertSee('Discover our projects')
            ->assertSee('Selling roses in Sant Jordi');
    }

    public function test_guests_cannot_open_the_admin(): void
    {
        $this->get('/admin')->assertRedirect(route('login'));
    }

    public function test_non_admins_cannot_manage_content(): void
    {
        $this->actingAs(User::factory()->create())->get('/admin')->assertForbidden();
    }

    public function test_admin_can_create_update_and_delete_a_project(): void
    {
        $admin = User::factory()->admin()->create();

        $this->actingAs($admin)->post(route('admin.projects.store'), [])
            ->assertSessionHasErrors('title.es');

        $this->actingAs($admin)->post(route('admin.projects.store'), [
            'title' => ['es' => 'Comedor social', 'en' => 'Community kitchen', 'ca' => ''],
            'description' => ['es' => 'Cocinamos para el barrio.', 'en' => '', 'ca' => ''],
            'what_done' => ['es' => 'Servimos cenas.', 'en' => '', 'ca' => ''],
            'what_learned' => ['es' => '', 'en' => '', 'ca' => ''],
            'published' => '1',
            'pinned' => '1',
        ])->assertRedirect();

        $project = Project::query()->where('slug', 'comedor-social')->first();
        $this->assertNotNull($project);
        $this->assertTrue($project->pinned);

        $this->get('/proyectos/comedor-social')->assertOk()->assertSee('Cocinamos para el barrio.');

        $this->actingAs($admin)->put(route('admin.projects.update', $project), [
            'title' => ['es' => 'Comedor de barrio', 'en' => '', 'ca' => ''],
            'description' => ['es' => 'Texto nuevo.', 'en' => '', 'ca' => ''],
            'what_done' => ['es' => '', 'en' => '', 'ca' => ''],
            'what_learned' => ['es' => '', 'en' => '', 'ca' => ''],
            'published' => '1',
        ])->assertRedirect();

        $this->assertSame('Comedor de barrio', $project->fresh()?->translate('title'));

        $this->actingAs($admin)->delete(route('admin.projects.destroy', $project))->assertRedirect();
        $this->assertDatabaseMissing('projects', ['id' => $project->id]);
    }

    public function test_admin_can_manage_members_news_events_and_messages(): void
    {
        $admin = User::factory()->admin()->create();

        $this->actingAs($admin)->post(route('admin.members.store'), [
            'name' => 'Laia Costa',
            'role' => 'member',
        ])->assertRedirect();

        $this->assertDatabaseHas('members', ['name' => 'Laia Costa']);

        $this->actingAs($admin)->post(route('admin.news.store'), [
            'title' => ['es' => 'Primera asamblea', 'en' => '', 'ca' => ''],
            'excerpt' => ['es' => '', 'en' => '', 'ca' => ''],
            'body' => ['es' => 'Nos reunimos para planear el año.', 'en' => '', 'ca' => ''],
            'published' => '1',
        ])->assertRedirect();

        $post = NewsPost::query()->where('slug', 'primera-asamblea')->first();
        $this->assertNotNull($post);
        $this->get('/noticias/primera-asamblea')->assertOk()->assertSee('Primera asamblea');

        $this->actingAs($admin)->post(route('admin.events.store'), [
            'title' => ['es' => 'Cena de socios', 'en' => '', 'ca' => ''],
            'description' => ['es' => 'Cena informal.', 'en' => '', 'ca' => ''],
            'starts_at' => now()->addWeek()->format('Y-m-d H:i:s'),
            'location' => 'Bruc 147',
            'published' => '1',
        ])->assertRedirect();

        $this->assertSame(1, Event::query()->count());
        $this->get('/reuniones')->assertOk()->assertSee('Cena de socios');

        $this->post('/contacto', [
            'name' => 'Joan Serra',
            'email' => 'joan@example.com',
            'message' => 'Quiero visitar una reunión.',
        ])->assertRedirect(route('contact'));

        $message = ContactMessage::query()->first();
        $this->assertNotNull($message);
        $this->assertNull($message->read_at);

        $this->post('/contacto', [
            'name' => 'Bot',
            'email' => 'bot@example.com',
            'message' => 'spam',
            'company' => 'acme',
        ])->assertRedirect(route('contact'));
        $this->assertDatabaseMissing('contact_messages', ['email' => 'bot@example.com']);

        $this->actingAs($admin)->get(route('admin.messages.show', $message))->assertOk();
        $this->assertNotNull($message->fresh()?->read_at);

        $this->actingAs($admin)->delete(route('admin.members.destroy', Member::query()->where('name', 'Laia Costa')->firstOrFail()))
            ->assertRedirect();
    }
}
