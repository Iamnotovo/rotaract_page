import { Head, Link } from '@inertiajs/react';

type Row = {
    id: number;
    name: string;
    email: string;
    excerpt: string;
    read: boolean;
    createdAt: string | null;
};

type Paginator = {
    data: Row[];
    prev_page_url: string | null;
    next_page_url: string | null;
};

export default function MessagesIndex({ messages }: { messages: Paginator }) {
    return (
        <div className="flex flex-col gap-4 p-4">
            <Head title="Mensajes" />
            <h1 className="text-2xl font-semibold">Mensajes de contacto</h1>
            {messages.data.length === 0 ? (
                <p className="text-sm text-muted-foreground">
                    No hay mensajes.
                </p>
            ) : (
                <ul className="divide-y rounded-xl border">
                    {messages.data.map((message) => (
                        <li key={message.id}>
                            <Link
                                href={`/admin/mensajes/${message.id}`}
                                className="block p-3 hover:bg-muted"
                            >
                                <p className="font-medium">
                                    {message.name}{' '}
                                    <span className="font-normal text-muted-foreground">
                                        · {message.email}
                                    </span>
                                    {!message.read && (
                                        <span className="ml-2 text-xs text-primary">
                                            Nuevo
                                        </span>
                                    )}
                                </p>
                                <p className="text-sm text-muted-foreground">
                                    {message.excerpt}
                                </p>
                                <p className="text-xs text-muted-foreground">
                                    {message.createdAt}
                                </p>
                            </Link>
                        </li>
                    ))}
                </ul>
            )}
            <div className="flex gap-3 text-sm">
                {messages.prev_page_url && (
                    <Link href={messages.prev_page_url}>Anterior</Link>
                )}
                {messages.next_page_url && (
                    <Link href={messages.next_page_url}>Siguiente</Link>
                )}
            </div>
        </div>
    );
}
