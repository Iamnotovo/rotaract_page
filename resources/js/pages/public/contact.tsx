import { Form, usePage } from '@inertiajs/react';
import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Seo } from '@/components/seo';
import { useT } from '@/hooks/use-t';

export default function Contact() {
    const t = useT();
    const { club } = usePage().props;

    return (
        <div className="mx-auto grid max-w-5xl gap-8 px-4 py-12 lg:grid-cols-2">
            <Seo />
            <div>
                <h1 className="text-4xl font-semibold tracking-tight">
                    {t('home.contactHeading')}
                </h1>
                <p className="mt-4 leading-relaxed text-ink/80">
                    {t('home.contactLeadBefore')}
                    <strong>{t('home.contactLeadStrong')}</strong>
                    {t('home.contactLeadAfter')}
                </p>
                <a
                    href={club.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-5 inline-flex rounded-full bg-brand px-4 py-2 text-sm font-semibold text-white hover:bg-brand-dark"
                >
                    {t('home.instagramCta')}
                </a>
                <p className="mt-6 text-sm text-ink/70">
                    <a
                        className="text-brand hover:underline"
                        href={`mailto:${club.email}`}
                    >
                        {club.email}
                    </a>
                </p>
            </div>
            <section
                className="rounded-2xl bg-white p-6 ring-1 ring-black/5"
                aria-labelledby="formulario"
            >
                <h2 id="formulario" className="text-2xl font-semibold">
                    {t('extras.contactFormTitle')}
                </h2>
                <p className="mt-2 text-sm text-ink/70">
                    {t('extras.contactFormLead')}
                </p>
                <Form
                    action="/contacto"
                    method="post"
                    className="mt-5 grid gap-4"
                    resetOnSuccess
                >
                    {({ errors, processing }) => (
                        <>
                            <div
                                className="absolute -left-[9999px]"
                                aria-hidden="true"
                            >
                                <label htmlFor="company">
                                    {t('extras.company')}
                                </label>
                                <input
                                    id="company"
                                    name="company"
                                    tabIndex={-1}
                                    autoComplete="off"
                                />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="name">{t('extras.name')}</Label>
                                <Input
                                    id="name"
                                    name="name"
                                    required
                                    autoComplete="name"
                                />
                                <InputError message={errors.name} />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="email">
                                    {t('extras.email')}
                                </Label>
                                <Input
                                    id="email"
                                    name="email"
                                    type="email"
                                    required
                                    autoComplete="email"
                                />
                                <InputError message={errors.email} />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="message">
                                    {t('extras.message')}
                                </Label>
                                <textarea
                                    id="message"
                                    name="message"
                                    required
                                    rows={6}
                                    className="w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm"
                                />
                                <InputError message={errors.message} />
                            </div>
                            <Button type="submit" disabled={processing}>
                                {t('extras.send')}
                            </Button>
                        </>
                    )}
                </Form>
            </section>
        </div>
    );
}
