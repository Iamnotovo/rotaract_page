import { Link } from '@inertiajs/react';
import { Seo } from '@/components/seo';
import { useT } from '@/hooks/use-t';

export type NewsCard = {
    slug: string;
    title: string;
    excerpt: string;
    cover: string | null;
    publishedAt: string | null;
};

export default function News({ posts }: { posts: NewsCard[] }) {
    const t = useT();

    return (
        <div className="mx-auto max-w-3xl px-4 py-12">
            <Seo />
            <h1 className="text-4xl font-semibold tracking-tight">
                {t('extras.news')}
            </h1>
            {posts.length === 0 ? (
                <p className="mt-6 text-ink/70">{t('extras.newsEmpty')}</p>
            ) : (
                <ul className="mt-8 grid gap-6">
                    {posts.map((post) => (
                        <li
                            key={post.slug}
                            className="overflow-hidden rounded-2xl bg-white ring-1 ring-black/5"
                        >
                            {post.cover && (
                                <img
                                    src={post.cover}
                                    alt=""
                                    className="h-56 w-full object-cover"
                                />
                            )}
                            <div className="p-6">
                                {post.publishedAt && (
                                    <p className="text-sm text-brand">
                                        {post.publishedAt}
                                    </p>
                                )}
                                <h2 className="mt-1 text-2xl font-semibold">
                                    {post.title}
                                </h2>
                                <p className="mt-2 text-ink/75">
                                    {post.excerpt}
                                </p>
                                <Link
                                    href={`/noticias/${post.slug}`}
                                    className="mt-3 inline-flex font-semibold text-brand hover:underline"
                                >
                                    {t('extras.readNews')}
                                </Link>
                            </div>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}
