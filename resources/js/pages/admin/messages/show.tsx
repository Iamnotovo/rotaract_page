import { Form, Head, Link } from '@inertiajs/react';
import { Button } from '@/components/ui/button';

export default function MessageShow({
    message,
}: {
    message: {
        id: number;
        name: string;
        email: string;
        body: string;
        createdAt: string | null;
    };
}) {
    return (
        <article className="mx-auto flex max-w-2xl flex-col gap-4 p-4">
            <Head title={`Mensaje de ${message.name}`} />
            <Link
                href="/admin/mensajes"
                className="text-sm text-primary hover:underline"
            >
                ← Mensajes
            </Link>
            <h1 className="text-2xl font-semibold">{message.name}</h1>
            <p className="text-sm text-muted-foreground">
                <a className="underline" href={`mailto:${message.email}`}>
                    {message.email}
                </a>
                {message.createdAt ? ` · ${message.createdAt}` : ''}
            </p>
            <p className="leading-relaxed whitespace-pre-line">
                {message.body}
            </p>
            <Form action={`/admin/mensajes/${message.id}`} method="delete">
                {({ processing }) => (
                    <Button
                        type="submit"
                        variant="destructive"
                        disabled={processing}
                        onClick={(event) => {
                            if (
                                !confirm(
                                    '¿Seguro que quieres eliminar este mensaje?',
                                )
                            )
                                event.preventDefault();
                        }}
                    >
                        Eliminar
                    </Button>
                )}
            </Form>
        </article>
    );
}
