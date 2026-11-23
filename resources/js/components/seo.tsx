import { Head, usePage } from '@inertiajs/react';

type SeoProps = {
    title?: string;
    page?: string;
    description?: string;
};

export function Seo() {
    const { seo, club } = usePage<{
        seo?: SeoProps;
        club: { url: string };
    }>().props;
    const path = usePage().url.split('?')[0] ?? '/';
    const canonical = `${club.url}${path === '/' ? '' : path}`;

    if (!seo?.description) {
        return null;
    }

    return (
        <Head title={seo.page}>
            <meta name="description" content={seo.description} />
            <link rel="canonical" href={canonical} />
            <meta property="og:title" content={seo.title ?? seo.page ?? ''} />
            <meta property="og:description" content={seo.description} />
            <meta property="og:url" content={canonical} />
        </Head>
    );
}
