import { Link } from '@inertiajs/react';
import { Seo } from '@/components/seo';
import { useT } from '@/hooks/use-t';

export type ProjectCard = {
    slug: string;
    title: string;
    description: string;
    photo: string | null;
    photoPosition: string;
    pinned: boolean;
};

const EXPLORE = [
    { href: '/proyectos', key: 'projects' },
    { href: '/quienes-somos', key: 'about' },
    { href: '/miembros', key: 'members' },
    { href: '/reuniones', key: 'meetings' },
    { href: '/enlaces', key: 'links' },
] as const;

export default function Home({ featured }: { featured: ProjectCard[] }) {
    const t = useT();

    return (
        <div>
            <Seo />
            <section className="mx-auto max-w-6xl px-4 pt-6">
                <div className="relative overflow-hidden rounded-3xl">
                    <img
                        src="/group-photo.jpeg"
                        alt=""
                        className="h-[28rem] w-full object-cover sm:h-[34rem]"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/45 to-black/10" />
                    <div className="absolute inset-0 flex flex-col justify-end p-6 text-white sm:p-12">
                        <p className="text-xs font-semibold tracking-[0.22em] uppercase">
                            {t('home.heroKicker')}
                        </p>
                        <h1 className="mt-3 max-w-xl text-4xl font-semibold tracking-tight sm:text-6xl">
                            {t('home.heroHeadline')}
                        </h1>
                        <p className="mt-4 max-w-lg text-base text-white/90 sm:text-lg">
                            {t('home.heroSub')}
                        </p>
                        <div className="mt-6 flex flex-wrap gap-3">
                            <Link
                                href="/proyectos"
                                className="rounded-full bg-brand px-5 py-3 text-sm font-semibold text-white hover:bg-brand-dark focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                            >
                                {t('home.exploreProjects')}
                            </Link>
                            <Link
                                href="/quienes-somos"
                                className="rounded-full bg-white px-5 py-3 text-sm font-semibold text-ink hover:bg-paper focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                            >
                                {t('home.aboutUsCta')}
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            <section className="mx-auto max-w-3xl px-4 py-14">
                <h2 className="text-3xl font-semibold tracking-tight">
                    {t('home.title')}
                </h2>
                <p className="mt-4 text-lg leading-relaxed text-ink/80">
                    {t('home.lead')}
                </p>
            </section>

            {featured.length > 0 && (
                <section
                    className="mx-auto max-w-6xl px-4"
                    aria-labelledby="destacados"
                >
                    <h2 id="destacados" className="text-2xl font-semibold">
                        {t('extras.featured')}
                    </h2>
                    <p className="mt-2 max-w-2xl text-ink/70">
                        {t('extras.featuredLead')}
                    </p>
                    <ul className="mt-6 grid gap-5 md:grid-cols-3">
                        {featured.map((project) => (
                            <li key={project.slug}>
                                <Link
                                    href={`/proyectos/${project.slug}`}
                                    className="group block overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-black/5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand"
                                >
                                    {project.photo && (
                                        <img
                                            src={project.photo}
                                            alt=""
                                            className="h-48 w-full object-cover"
                                            style={{
                                                objectPosition:
                                                    project.photoPosition,
                                            }}
                                        />
                                    )}
                                    <div className="p-5">
                                        <h3 className="text-lg font-semibold group-hover:text-brand">
                                            {project.title}
                                        </h3>
                                        <p className="mt-2 line-clamp-3 text-sm text-ink/70">
                                            {project.description}
                                        </p>
                                    </div>
                                </Link>
                            </li>
                        ))}
                    </ul>
                </section>
            )}

            <section
                className="mx-auto max-w-6xl px-4 py-14"
                aria-labelledby="explora"
            >
                <h2 id="explora" className="text-2xl font-semibold">
                    {t('home.exploreHeading')}
                </h2>
                <p className="mt-2 max-w-2xl text-ink/70">
                    {t('home.exploreLead')}
                </p>
                <ul className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {EXPLORE.map((card) => (
                        <li key={card.href}>
                            <Link
                                href={card.href}
                                className="flex h-full flex-col rounded-2xl bg-white p-5 shadow-sm ring-1 ring-black/5 hover:ring-brand/40 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand"
                            >
                                <span className="text-xs font-semibold tracking-wide text-brand uppercase">
                                    {t(`home.cards.${card.key}.tagline`)}
                                </span>
                                <span className="mt-2 text-lg font-semibold">
                                    {t(`home.cards.${card.key}.title`)}
                                </span>
                                <span className="mt-2 text-sm text-ink/70">
                                    {t(`home.cards.${card.key}.description`)}
                                </span>
                                <span className="mt-4 text-sm font-semibold text-brand">
                                    {t('home.exploreOpen')} →
                                </span>
                            </Link>
                        </li>
                    ))}
                </ul>
            </section>

            <section className="mx-auto grid max-w-6xl gap-6 px-4 pb-8 md:grid-cols-2">
                <article className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-black/5">
                    <h2 className="text-2xl font-semibold">
                        {t('home.joinHeading')}
                    </h2>
                    <p className="mt-3 leading-relaxed text-ink/80">
                        {t('home.joinBodyBefore')}
                        <a
                            className="font-semibold text-brand underline-offset-2 hover:underline"
                            href="https://www.instagram.com/rotaractdiagonal/"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            Instagram
                        </a>{' '}
                        {t('home.joinBodyAfter')}
                    </p>
                </article>
                <article
                    id="contacto"
                    className="rounded-2xl bg-brand p-6 text-white"
                >
                    <h2 className="text-2xl font-semibold">
                        {t('home.contactHeading')}
                    </h2>
                    <p className="mt-3 leading-relaxed text-white/90">
                        {t('home.contactLeadBefore')}
                        <strong>{t('home.contactLeadStrong')}</strong>
                        {t('home.contactLeadAfter')}
                    </p>
                    <div className="mt-5 flex flex-wrap gap-3">
                        <a
                            href="https://www.instagram.com/rotaractdiagonal/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="rounded-full bg-white px-4 py-2 text-sm font-semibold text-brand"
                        >
                            {t('home.instagramCta')}
                        </a>
                        <Link
                            href="/contacto"
                            className="rounded-full border border-white/50 px-4 py-2 text-sm font-semibold"
                        >
                            {t('extras.contactFormTitle')}
                        </Link>
                    </div>
                </article>
            </section>
        </div>
    );
}
