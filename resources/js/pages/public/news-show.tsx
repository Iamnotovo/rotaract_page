import { Link } from '@inertiajs/react';
import { Seo } from '@/components/seo';
import { useT } from '@/hooks/use-t';
import type { NewsCard } from '@/pages/public/news';

export default function NewsShow({
    post,
}: {
    post: NewsCard & { body: string };
}) {
    const t = useT();

    return (
        <article className="mx-auto max-w-3xl px-4 py-12">
            <Seo />
            <Link
                href="/noticias"
                className="text-sm font-semibold text-brand hover:underline"
            >
                ← {t('extras.backNews')}
            </Link>
            {post.publishedAt && (
                <p className="mt-4 text-sm text-brand">{post.publishedAt}</p>
            )}
            <h1 className="mt-2 text-4xl font-semibold tracking-tight">
                {post.title}
            </h1>
            {post.cover && (
                <img
                    src={post.cover}
                    alt=""
                    className="mt-6 aspect-[16/9] w-full rounded-2xl object-cover"
                />
            )}
            <div className="mt-6 leading-relaxed whitespace-pre-line text-ink/80">
                {post.body}
            </div>
        </article>
    );
}
