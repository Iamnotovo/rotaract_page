import { Form, Head, Link } from '@inertiajs/react';
import {
    emptyTranslation,
    TranslationFields,
    type Translated,
} from '@/components/translation-fields';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import InputError from '@/components/input-error';

type LinkFormData = {
    id: number;
    title: Translated;
    description: Translated;
    url: string;
    sortOrder: number;
};

export default function LinkFormPage({ link }: { link: LinkFormData | null }) {
    return (
        <div className="mx-auto flex max-w-3xl flex-col gap-4 p-4">
            <Head title={link ? 'Editar enlace' : 'Nuevo enlace'} />
            <h1 className="text-2xl font-semibold">
                {link ? 'Editar enlace' : 'Nuevo enlace'}
            </h1>
            <Form
                action={link ? `/admin/enlaces/${link.id}` : '/admin/enlaces'}
                method={link ? 'put' : 'post'}
                className="grid gap-4"
            >
                {({ errors, processing }) => (
                    <>
                        <TranslationFields
                            name="title"
                            label="Título"
                            values={link?.title ?? emptyTranslation()}
                            errors={errors}
                            required
                        />
                        <TranslationFields
                            name="description"
                            label="Descripción"
                            values={link?.description ?? emptyTranslation()}
                            errors={errors}
                            multiline
                        />
                        <div className="grid gap-2">
                            <Label htmlFor="url">URL</Label>
                            <Input
                                id="url"
                                name="url"
                                required
                                defaultValue={link?.url ?? ''}
                                placeholder="https:// o mailto:"
                            />
                            <InputError message={errors.url} />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="sort_order">Orden</Label>
                            <Input
                                id="sort_order"
                                name="sort_order"
                                type="number"
                                min={0}
                                defaultValue={link?.sortOrder ?? 0}
                            />
                        </div>
                        <div className="flex gap-2">
                            <Button type="submit" disabled={processing}>
                                Guardar
                            </Button>
                            <Button variant="outline" asChild>
                                <Link href="/admin/enlaces">Volver</Link>
                            </Button>
                        </div>
                    </>
                )}
            </Form>
        </div>
    );
}
