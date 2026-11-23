import { Form, Head, Link } from '@inertiajs/react';
import {
    emptyTranslation,
    TranslationFields,
    type Translated,
} from '@/components/translation-fields';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';

type ProjectFormData = {
    id: number;
    title: Translated;
    description: Translated;
    whatDone: Translated;
    whatLearned: Translated;
    photoPosition: string;
    photo: string | null;
    pinned: boolean;
    published: boolean;
    gallery: { id: number; url: string | null }[];
};

export default function ProjectForm({
    project,
}: {
    project: ProjectFormData | null;
}) {
    const positions = ['50% 50%', '50% 15%', '50% 11%', '50% 85%'];

    return (
        <div className="mx-auto flex max-w-3xl flex-col gap-4 p-4">
            <Head title={project ? 'Editar proyecto' : 'Nuevo proyecto'} />
            <h1 className="text-2xl font-semibold">
                {project ? 'Editar proyecto' : 'Nuevo proyecto'}
            </h1>
            <Form
                action={
                    project
                        ? `/admin/proyectos/${project.id}`
                        : '/admin/proyectos'
                }
                method={project ? 'put' : 'post'}
                className="grid gap-4"
            >
                {({ errors, processing }) => (
                    <>
                        <TranslationFields
                            name="title"
                            label="Título"
                            values={project?.title ?? emptyTranslation()}
                            errors={errors}
                            required
                        />
                        <TranslationFields
                            name="description"
                            label="Descripción"
                            values={project?.description ?? emptyTranslation()}
                            errors={errors}
                            multiline
                            required
                        />
                        <TranslationFields
                            name="what_done"
                            label="Qué hicimos"
                            values={project?.whatDone ?? emptyTranslation()}
                            errors={errors}
                            multiline
                        />
                        <TranslationFields
                            name="what_learned"
                            label="Qué aprendimos"
                            values={project?.whatLearned ?? emptyTranslation()}
                            errors={errors}
                            multiline
                        />
                        <div className="grid gap-2">
                            <Label htmlFor="main_photo">Foto principal</Label>
                            {project?.photo && (
                                <img
                                    src={project.photo}
                                    alt=""
                                    className="h-40 w-full rounded-md object-cover"
                                />
                            )}
                            <input
                                id="main_photo"
                                name="main_photo"
                                type="file"
                                accept="image/*"
                            />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="main_photo_position">
                                Encuadre
                            </Label>
                            <select
                                id="main_photo_position"
                                name="main_photo_position"
                                defaultValue={
                                    project?.photoPosition ?? '50% 50%'
                                }
                                className="h-9 rounded-md border border-input px-2 text-sm"
                            >
                                {positions.map((position) => (
                                    <option key={position} value={position}>
                                        {position}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="gallery">Galería</Label>
                            <input
                                id="gallery"
                                name="gallery[]"
                                type="file"
                                accept="image/*"
                                multiple
                            />
                        </div>
                        <label className="flex items-center gap-2 text-sm">
                            <input
                                type="checkbox"
                                name="pinned"
                                value="1"
                                defaultChecked={project?.pinned ?? false}
                            />
                            Destacar en la portada
                        </label>
                        <label className="flex items-center gap-2 text-sm">
                            <input
                                type="checkbox"
                                name="published"
                                value="1"
                                defaultChecked={project?.published ?? true}
                            />
                            Publicado
                        </label>
                        <div className="flex gap-2">
                            <Button type="submit" disabled={processing}>
                                Guardar
                            </Button>
                            <Button variant="outline" asChild>
                                <Link href="/admin/proyectos">Volver</Link>
                            </Button>
                        </div>
                    </>
                )}
            </Form>
            {project && project.gallery.length > 0 && (
                <ul className="grid grid-cols-2 gap-3">
                    {project.gallery.map((photo) => (
                        <li key={photo.id} className="rounded-lg border p-2">
                            {photo.url && (
                                <img
                                    src={photo.url}
                                    alt=""
                                    className="h-32 w-full object-cover"
                                />
                            )}
                            <Form
                                action={`/admin/proyectos/${project.id}/fotos/${photo.id}`}
                                method="delete"
                            >
                                {({ processing }) => (
                                    <Button
                                        type="submit"
                                        variant="outline"
                                        className="mt-2"
                                        disabled={processing}
                                    >
                                        Quitar foto
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
