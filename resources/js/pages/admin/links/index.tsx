import { Form, Head, Link } from '@inertiajs/react';
import { Button } from '@/components/ui/button';

type Row = { id: number; title: string; description: string; url: string };

export default function LinksIndex({ links }: { links: Row[] }) {
    return (
        <div className="flex flex-col gap-4 p-4">
            <Head title="Enlaces" />
            <div className="flex items-center justify-between">
                <h1 className="text-2xl font-semibold">Enlaces</h1>
                <Button asChild>
                    <Link href="/admin/enlaces/crear">Añadir</Link>
                </Button>
            </div>
            <ul className="divide-y rounded-xl border">
                {links.map((link) => (
                    <li key={link.id} className="flex items-center gap-3 p-3">
                        <div className="min-w-0 flex-1">
                            <p className="font-medium">{link.title}</p>
                            <p className="truncate text-sm text-muted-foreground">
                                {link.url}
                            </p>
                        </div>
                        <Button variant="outline" asChild>
                            <Link href={`/admin/enlaces/${link.id}/editar`}>
                                Editar
                            </Link>
                        </Button>
                        <Form
                            action={`/admin/enlaces/${link.id}`}
                            method="delete"
                        >
                            {({ processing }) => (
                                <Button
                                    type="submit"
                                    variant="destructive"
                                    disabled={processing}
                                    onClick={(event) => {
                                        if (
                                            !confirm(
                                                '¿Seguro que quieres eliminar este enlace?',
                                            )
                                        )
                                            event.preventDefault();
                                    }}
                                >
                                    Borrar
                                </Button>
                            )}
                        </Form>
                    </li>
                ))}
            </ul>
        </div>
    );
}
