import { Seo } from '@/components/seo';
import { useT } from '@/hooks/use-t';

type ClubLink = {
    id: number;
    title: string;
    description: string;
    url: string;
};

export default function Links({ links }: { links: ClubLink[] }) {
    const t = useT();

    return (
        <div className="mx-auto max-w-3xl px-4 py-12">
            <Seo />
            <h1 className="text-4xl font-semibold tracking-tight">
                {t('linksPage.pageTitle')}
            </h1>
            {links.length === 0 ? (
                <p className="mt-6">{t('linksPage.empty')}</p>
            ) : (
                <ul className="mt-8 grid gap-4">
                    {links.map((link) => {
                        const mail = link.url
                            .toLowerCase()
                            .startsWith('mailto:');

                        return (
                            <li
                                key={link.id}
                                className="rounded-2xl bg-white p-5 ring-1 ring-black/5"
                            >
                                <a
                                    href={link.url}
                                    className="text-xl font-semibold text-brand hover:underline"
                                    {...(mail
                                        ? {}
                                        : {
                                              target: '_blank',
                                              rel: 'noopener noreferrer',
                                          })}
                                >
                                    {link.title}
                                </a>
                                {link.description && (
                                    <p className="mt-2 text-ink/75">
                                        {link.description}
                                    </p>
                                )}
                            </li>
                        );
                    })}
                </ul>
            )}
        </div>
    );
}
