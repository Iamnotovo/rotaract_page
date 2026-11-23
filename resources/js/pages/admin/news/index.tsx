import { Form, Head, Link } from '@inertiajs/react';
import { Button } from '@/components/ui/button';

type Row = {
    id: number;
    title: string;
    published: boolean;
    publishedAt: string | null;
};

export default function NewsIndex({ posts }: { posts: Row[] }) {
    return (
        <div className="flex flex-col gap-4 p-4">
            <Head title="Noticias" />
            <div className="flex items-center justify-between">
                <h1 className="text-2xl font-semibold">Noticias</h1>
                <Button asChild>
                    <Link href="/admin/noticias/crear">Añadir</Link>
                </Button>
            </div>
            {posts.length === 0 ? (
                <p className="text-sm text-muted-foreground">
                    Todavía no hay noticias.
                </p>
            ) : (
                <ul className="divide-y rounded-xl border">
                    {posts.map((post) => (
                        <li
                            key={post.id}
                            className="flex items-center gap-3 p-3"
                        >
                            <div className="flex-1">
                                <p className="font-medium">{post.title}</p>
                                <p className="text-xs text-muted-foreground">
                                    {post.published
                                        ? post.publishedAt
                                        : 'Borrador'}
                                </p>
                            </div>
                            <Button variant="outline" asChild>
                                <Link
                                    href={`/admin/noticias/${post.id}/editar`}
                                >
                                    Editar
                                </Link>
                            </Button>
                            <Form
                                action={`/admin/noticias/${post.id}`}
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
                                                    '¿Seguro que quieres eliminar esta noticia?',
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
            )}
        </div>
    );
}
