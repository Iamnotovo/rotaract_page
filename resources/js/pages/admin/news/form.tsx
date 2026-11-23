import { Form, Head, Link } from '@inertiajs/react';
import {
    emptyTranslation,
    TranslationFields,
    type Translated,
} from '@/components/translation-fields';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';

type PostForm = {
    id: number;
    title: Translated;
    excerpt: Translated;
    body: Translated;
    cover: string | null;
    publishedAt: string | null;
    published: boolean;
};

export default function NewsForm({ post }: { post: PostForm | null }) {
    return (
        <div className="mx-auto flex max-w-3xl flex-col gap-4 p-4">
            <Head title={post ? 'Editar noticia' : 'Nueva noticia'} />
            <h1 className="text-2xl font-semibold">
                {post ? 'Editar noticia' : 'Nueva noticia'}
            </h1>
            <Form
                action={post ? `/admin/noticias/${post.id}` : '/admin/noticias'}
                method={post ? 'put' : 'post'}
                className="grid gap-4"
            >
                {({ errors, processing }) => (
                    <>
                        <TranslationFields
                            name="title"
                            label="Título"
                            values={post?.title ?? emptyTranslation()}
                            errors={errors}
                            required
                        />
                        <TranslationFields
                            name="excerpt"
                            label="Entradilla"
                            values={post?.excerpt ?? emptyTranslation()}
                            errors={errors}
                            multiline
                        />
                        <TranslationFields
                            name="body"
                            label="Texto"
                            values={post?.body ?? emptyTranslation()}
                            errors={errors}
                            multiline
                            required
                        />
                        <div className="grid gap-2">
                            <Label htmlFor="cover">Imagen</Label>
                            {post?.cover && (
                                <img
                                    src={post.cover}
                                    alt=""
                                    className="h-40 w-full rounded-md object-cover"
                                />
                            )}
                            <input
                                id="cover"
                                name="cover"
                                type="file"
                                accept="image/*"
                            />
                        </div>
                        <label className="flex items-center gap-2 text-sm">
                            <input
                                type="checkbox"
                                name="published"
                                value="1"
                                defaultChecked={post?.published ?? false}
                            />
                            Publicada
                        </label>
                        <div className="grid gap-2">
                            <Label htmlFor="published_at">
                                Fecha de publicación
                            </Label>
                            <input
                                id="published_at"
                                name="published_at"
                                type="datetime-local"
                                defaultValue={post?.publishedAt ?? ''}
                                className="h-9 rounded-md border border-input px-2 text-sm"
                            />
                        </div>
                        <div className="flex gap-2">
                            <Button type="submit" disabled={processing}>
                                Guardar
                            </Button>
                            <Button variant="outline" asChild>
                                <Link href="/admin/noticias">Volver</Link>
                            </Button>
                        </div>
                    </>
                )}
            </Form>
        </div>
    );
}
