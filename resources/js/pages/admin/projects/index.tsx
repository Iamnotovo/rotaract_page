import { Form, Head, Link } from '@inertiajs/react';
import { Button } from '@/components/ui/button';

type Row = {
    id: number;
    title: string;
    pinned: boolean;
    published: boolean;
    photo: string | null;
};

export default function ProjectsIndex({ projects }: { projects: Row[] }) {
    return (
        <div className="flex flex-col gap-4 p-4">
            <Head title="Proyectos" />
            <div className="flex items-center justify-between">
                <h1 className="text-2xl font-semibold">Proyectos</h1>
                <Button asChild>
                    <Link href="/admin/proyectos/crear">Añadir</Link>
                </Button>
            </div>
            <ul className="divide-y rounded-xl border">
                {projects.map((project) => (
                    <li
                        key={project.id}
                        className="flex items-center gap-4 p-3"
                    >
                        {project.photo && (
                            <img
                                src={project.photo}
                                alt=""
                                className="size-16 rounded-md object-cover"
                            />
                        )}
                        <div className="min-w-0 flex-1">
                            <p className="font-medium">{project.title}</p>
                            <p className="text-xs text-muted-foreground">
                                {project.published ? 'Publicado' : 'Borrador'}
                                {project.pinned ? ' · Destacado' : ''}
                            </p>
                        </div>
                        <Button variant="outline" asChild>
                            <Link
                                href={`/admin/proyectos/${project.id}/editar`}
                            >
                                Editar
                            </Link>
                        </Button>
                        <Form
                            action={`/admin/proyectos/${project.id}`}
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
                                                '¿Seguro que quieres eliminar este proyecto?',
                                            )
                                        ) {
                                            event.preventDefault();
                                        }
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
