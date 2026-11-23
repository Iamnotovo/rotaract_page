import { Form, Head, Link } from '@inertiajs/react';
import { Button } from '@/components/ui/button';

type Row = {
    id: number;
    name: string;
    roleLabel: string;
    photo: string | null;
};

export default function MembersIndex({ members }: { members: Row[] }) {
    return (
        <div className="flex flex-col gap-4 p-4">
            <Head title="Miembros" />
            <div className="flex items-center justify-between">
                <h1 className="text-2xl font-semibold">Miembros</h1>
                <Button asChild>
                    <Link href="/admin/miembros/crear">Añadir</Link>
                </Button>
            </div>
            <ul className="divide-y rounded-xl border">
                {members.map((member) => (
                    <li key={member.id} className="flex items-center gap-3 p-3">
                        {member.photo && (
                            <img
                                src={member.photo}
                                alt=""
                                className="size-12 rounded-full object-cover"
                            />
                        )}
                        <div className="flex-1">
                            <p className="font-medium">{member.name}</p>
                            <p className="text-sm text-muted-foreground">
                                {member.roleLabel}
                            </p>
                        </div>
                        <Button variant="outline" asChild>
                            <Link href={`/admin/miembros/${member.id}/editar`}>
                                Editar
                            </Link>
                        </Button>
                        <Form
                            action={`/admin/miembros/${member.id}`}
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
                                                '¿Seguro que quieres eliminar a esta persona?',
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
