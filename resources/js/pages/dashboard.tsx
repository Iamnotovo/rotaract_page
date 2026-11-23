import { Link } from '@inertiajs/react';
import { Head } from '@inertiajs/react';

type Counts = {
    projects: number;
    news: number;
    events: number;
    members: number;
    links: number;
    unread: number;
};

type MessageRow = {
    id: number;
    name: string;
    email: string;
    excerpt: string;
    read: boolean;
    createdAt: string | null;
};

const CARDS = [
    { href: '/admin/proyectos', label: 'Proyectos', key: 'projects' },
    { href: '/admin/noticias', label: 'Noticias', key: 'news' },
    { href: '/admin/eventos', label: 'Actividades', key: 'events' },
    { href: '/admin/miembros', label: 'Miembros', key: 'members' },
    { href: '/admin/enlaces', label: 'Enlaces', key: 'links' },
    { href: '/admin/mensajes', label: 'Mensajes sin leer', key: 'unread' },
] as const;

export default function Dashboard({
    counts,
    messages,
}: {
    counts: Counts;
    messages: MessageRow[];
}) {
    return (
        <>
            <Head title="Administración" />
            <div className="flex flex-col gap-6 p-4">
                <h1 className="text-2xl font-semibold">Panel del club</h1>
                <ul className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
                    {CARDS.map((card) => (
                        <li key={card.href}>
                            <Link
                                href={card.href}
                                className="block rounded-xl border p-4 hover:bg-muted"
                            >
                                <p className="text-sm text-muted-foreground">
                                    {card.label}
                                </p>
                                <p className="text-3xl font-semibold">
                                    {counts[card.key]}
                                </p>
                            </Link>
                        </li>
                    ))}
                </ul>
                <section>
                    <h2 className="text-lg font-semibold">Últimos mensajes</h2>
                    {messages.length === 0 ? (
                        <p className="mt-2 text-sm text-muted-foreground">
                            Todavía no hay mensajes.
                        </p>
                    ) : (
                        <ul className="mt-3 divide-y rounded-xl border">
                            {messages.map((message) => (
                                <li key={message.id}>
                                    <Link
                                        href={`/admin/mensajes/${message.id}`}
                                        className="block px-4 py-3 hover:bg-muted"
                                    >
                                        <p className="font-medium">
                                            {message.name}
                                            {!message.read && (
                                                <span className="ml-2 text-xs text-primary">
                                                    Nuevo
                                                </span>
                                            )}
                                        </p>
                                        <p className="text-sm text-muted-foreground">
                                            {message.excerpt}
                                        </p>
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    )}
                </section>
            </div>
        </>
    );
}

Dashboard.layout = {
    breadcrumbs: [{ title: 'Resumen', href: '/admin' }],
};
