import { Link, router, usePage } from '@inertiajs/react';
import { useState } from 'react';
import { useT } from '@/hooks/use-t';

const CLUB_LINKS = [
    { href: '/quienes-somos', key: 'nav.aboutUs' },
    { href: '/reuniones', key: 'nav.meetings' },
    { href: '/miembros', key: 'nav.members' },
    { href: '/enlaces', key: 'nav.usefulLinks' },
] as const;

export default function PublicLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const t = useT();
    const page = usePage();
    const { locale, locales, club, auth } = page.props;
    const path = page.url.split('?')[0] ?? '/';
    const [open, setOpen] = useState(false);
    const isAdmin = Boolean(auth.user?.is_admin);
    const year = new Date().getFullYear();

    const itemClass = (href: string, prefix = false) => {
        const active = prefix ? path.startsWith(href) : path === href;

        return `rounded-full px-3 py-2 text-sm font-medium transition focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand ${
            active ? 'bg-white text-brand' : 'text-ink/80 hover:text-brand'
        }`;
    };

    return (
        <div className="min-h-screen bg-paper text-ink">
            <a
                href="#contenido"
                className="sr-only focus:not-sr-only focus:absolute focus:z-50 focus:m-3 focus:rounded-md focus:bg-white focus:px-3 focus:py-2"
            >
                {t('extras.skip')}
            </a>
            <header className="border-b border-black/5 bg-white">
                <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3">
                    <Link
                        href="/"
                        className="shrink-0 rounded-md focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand"
                    >
                        <img
                            src="/logo.png"
                            alt={t('meta.logoAlt')}
                            className="h-14 w-auto sm:h-16"
                        />
                    </Link>
                    <div className="flex items-center gap-2">
                        <label className="sr-only" htmlFor="idioma">
                            {t('langSwitcher.label')}
                        </label>
                        <select
                            id="idioma"
                            className="rounded-full border border-black/10 bg-white px-3 py-2 text-sm focus-visible:outline-2 focus-visible:outline-brand"
                            value={locale}
                            onChange={(event) =>
                                router.post(
                                    '/idioma',
                                    { locale: event.target.value },
                                    { preserveScroll: true },
                                )
                            }
                        >
                            {locales.map((item) => (
                                <option key={item.code} value={item.code}>
                                    {item.label}
                                </option>
                            ))}
                        </select>
                        <Link
                            href={isAdmin ? '/admin' : '/login'}
                            className="hidden rounded-full bg-brand px-4 py-2 text-sm font-semibold text-white hover:bg-brand-dark focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand sm:inline-flex"
                        >
                            {isAdmin ? t('extras.admin') : t('nav.login')}
                        </Link>
                        <button
                            type="button"
                            className="rounded-md border border-black/10 px-3 py-2 text-sm md:hidden"
                            aria-expanded={open}
                            aria-controls="menu-movil"
                            onClick={() => setOpen((value) => !value)}
                        >
                            {open
                                ? t('extras.closeMenu')
                                : t('extras.openMenu')}
                        </button>
                    </div>
                </div>
                <nav
                    id="menu-movil"
                    aria-label={t('nav.home')}
                    className={`${open ? 'block' : 'hidden'} border-t border-black/5 bg-[#ece7e8] md:block`}
                >
                    <ul className="mx-auto flex max-w-6xl flex-col gap-1 px-4 py-3 md:flex-row md:items-center md:gap-1">
                        <li>
                            <Link
                                className={itemClass('/')}
                                href="/"
                                onClick={() => setOpen(false)}
                            >
                                {t('nav.home')}
                            </Link>
                        </li>
                        <li>
                            <Link
                                className={itemClass('/proyectos', true)}
                                href="/proyectos"
                                onClick={() => setOpen(false)}
                            >
                                {t('nav.projects')}
                            </Link>
                        </li>
                        <li>
                            <Link
                                className={itemClass('/noticias', true)}
                                href="/noticias"
                                onClick={() => setOpen(false)}
                            >
                                {t('extras.news')}
                            </Link>
                        </li>
                        <li className="md:relative">
                            <details className="group">
                                <summary className="cursor-pointer list-none rounded-full px-3 py-2 text-sm font-medium text-ink/80 marker:content-none hover:text-brand focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand [&::-webkit-details-marker]:hidden">
                                    {t('nav.theClub')}
                                    <span aria-hidden="true"> ▾</span>
                                </summary>
                                <ul className="mt-1 flex flex-col rounded-xl bg-white p-2 shadow-sm md:absolute md:z-20 md:min-w-52">
                                    {CLUB_LINKS.map((link) => (
                                        <li key={link.href}>
                                            <Link
                                                href={link.href}
                                                className="block rounded-lg px-3 py-2 text-sm hover:bg-paper hover:text-brand"
                                                onClick={() => setOpen(false)}
                                            >
                                                {t(link.key)}
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </details>
                        </li>
                        <li>
                            <Link
                                className={itemClass('/contacto')}
                                href="/contacto"
                                onClick={() => setOpen(false)}
                            >
                                {t('extras.contact')}
                            </Link>
                        </li>
                        <li className="sm:hidden">
                            <Link
                                href={isAdmin ? '/admin' : '/login'}
                                className="block rounded-full px-3 py-2 text-sm font-semibold text-brand"
                                onClick={() => setOpen(false)}
                            >
                                {isAdmin ? t('extras.admin') : t('nav.login')}
                            </Link>
                        </li>
                    </ul>
                </nav>
            </header>
            <main id="contenido">{children}</main>
            <footer className="mt-16 border-t border-black/5 bg-white">
                <div className="mx-auto grid max-w-6xl gap-8 px-4 py-10 sm:grid-cols-3">
                    <div>
                        <p className="font-semibold">{t('meta.title')}</p>
                        <p className="mt-2 text-sm text-ink/70">
                            {club.address}
                        </p>
                    </div>
                    <div className="text-sm">
                        <p className="font-semibold">{t('extras.contact')}</p>
                        <a
                            className="mt-2 block text-brand underline-offset-2 hover:underline"
                            href={`mailto:${club.email}`}
                        >
                            {club.email}
                        </a>
                        <a
                            className="mt-1 block text-brand underline-offset-2 hover:underline"
                            href={club.instagram}
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            Instagram
                        </a>
                    </div>
                    <p className="text-sm text-ink/60 sm:text-right">
                        {t('footer.copyright', { year })}
                    </p>
                </div>
            </footer>
        </div>
    );
}
