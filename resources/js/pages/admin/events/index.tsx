import { Form, Head, Link } from '@inertiajs/react';
import { Button } from '@/components/ui/button';

type Row = { id: number; title: string; when: string; published: boolean };

export default function EventsIndex({ events }: { events: Row[] }) {
    return (
        <div className="flex flex-col gap-4 p-4">
            <Head title="Actividades" />
            <div className="flex items-center justify-between">
                <h1 className="text-2xl font-semibold">Actividades</h1>
                <Button asChild>
                    <Link href="/admin/eventos/crear">Añadir</Link>
                </Button>
            </div>
            {events.length === 0 ? (
                <p className="text-sm text-muted-foreground">
                    No hay actividades. La reunión de los lunes sigue en la
                    página pública.
                </p>
            ) : (
                <ul className="divide-y rounded-xl border">
                    {events.map((event) => (
                        <li
                            key={event.id}
                            className="flex items-center gap-3 p-3"
                        >
                            <div className="flex-1">
                                <p className="font-medium">{event.title}</p>
                                <p className="text-sm text-muted-foreground">
                                    {event.when} ·{' '}
                                    {event.published ? 'Publicada' : 'Borrador'}
                                </p>
                            </div>
                            <Button variant="outline" asChild>
                                <Link
                                    href={`/admin/eventos/${event.id}/editar`}
                                >
                                    Editar
                                </Link>
                            </Button>
                            <Form
                                action={`/admin/eventos/${event.id}`}
                                method="delete"
                            >
                                {({ processing }) => (
                                    <Button
                                        type="submit"
                                        variant="destructive"
                                        disabled={processing}
                                        onClick={(eventClick) => {
                                            if (
                                                !confirm(
                                                    '¿Seguro que quieres eliminar esta actividad?',
                                                )
                                            )
                                                eventClick.preventDefault();
                                        }}
                                    >
                                        Borrar
                                    </Button>
                                )}
                            </Form>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}
