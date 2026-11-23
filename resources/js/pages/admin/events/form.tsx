import { Form, Head, Link } from '@inertiajs/react';
import InputError from '@/components/input-error';
import {
    emptyTranslation,
    TranslationFields,
    type Translated,
} from '@/components/translation-fields';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

type EventFormData = {
    id: number;
    title: Translated;
    description: Translated;
    startsAt: string;
    endsAt: string | null;
    location: string;
    mapsUrl: string;
    published: boolean;
};

export default function EventFormPage({
    event,
}: {
    event: EventFormData | null;
}) {
    return (
        <div className="mx-auto flex max-w-3xl flex-col gap-4 p-4">
            <Head title={event ? 'Editar actividad' : 'Nueva actividad'} />
            <h1 className="text-2xl font-semibold">
                {event ? 'Editar actividad' : 'Nueva actividad'}
            </h1>
            <Form
                action={event ? `/admin/eventos/${event.id}` : '/admin/eventos'}
                method={event ? 'put' : 'post'}
                className="grid gap-4"
            >
                {({ errors, processing }) => (
                    <>
                        <TranslationFields
                            name="title"
                            label="Título"
                            values={event?.title ?? emptyTranslation()}
                            errors={errors}
                            required
                        />
                        <TranslationFields
                            name="description"
                            label="Descripción"
                            values={event?.description ?? emptyTranslation()}
                            errors={errors}
                            multiline
                        />
                        <div className="grid gap-2 sm:grid-cols-2">
                            <div className="grid gap-2">
                                <Label htmlFor="starts_at">Empieza</Label>
                                <input
                                    id="starts_at"
                                    name="starts_at"
                                    type="datetime-local"
                                    required
                                    defaultValue={event?.startsAt ?? ''}
                                    className="h-9 rounded-md border border-input px-2 text-sm"
                                />
                                <InputError message={errors.starts_at} />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="ends_at">Termina</Label>
                                <input
                                    id="ends_at"
                                    name="ends_at"
                                    type="datetime-local"
                                    defaultValue={event?.endsAt ?? ''}
                                    className="h-9 rounded-md border border-input px-2 text-sm"
                                />
                                <InputError message={errors.ends_at} />
                            </div>
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="location">Lugar</Label>
                            <Input
                                id="location"
                                name="location"
                                defaultValue={event?.location ?? ''}
                            />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="maps_url">Enlace del mapa</Label>
                            <Input
                                id="maps_url"
                                name="maps_url"
                                type="url"
                                defaultValue={event?.mapsUrl ?? ''}
                            />
                            <InputError message={errors.maps_url} />
                        </div>
                        <label className="flex items-center gap-2 text-sm">
                            <input
                                type="checkbox"
                                name="published"
                                value="1"
                                defaultChecked={event?.published ?? true}
                            />
                            Publicada
                        </label>
                        <div className="flex gap-2">
                            <Button type="submit" disabled={processing}>
                                Guardar
                            </Button>
                            <Button variant="outline" asChild>
                                <Link href="/admin/eventos">Volver</Link>
                            </Button>
                        </div>
                    </>
                )}
            </Form>
        </div>
    );
}
