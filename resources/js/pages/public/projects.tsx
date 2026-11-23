import { Link } from '@inertiajs/react';
import { Seo } from '@/components/seo';
import { useT } from '@/hooks/use-t';
import type { ProjectCard } from '@/pages/public/home';

export default function Projects({ projects }: { projects: ProjectCard[] }) {
    const t = useT();

    return (
        <div className="mx-auto max-w-6xl px-4 py-12">
            <Seo />
            <h1 className="text-4xl font-semibold tracking-tight">
                {t('projectsPage.pageTitle')}
            </h1>
            {projects.length === 0 ? (
                <p className="mt-6 text-ink/70">{t('projectsPage.none')}</p>
            ) : (
                <ul className="mt-8 grid gap-6 sm:grid-cols-2">
                    {projects.map((project) => (
                        <li key={project.slug}>
                            <article className="overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-black/5">
                                {project.photo && (
                                    <img
                                        src={project.photo}
                                        alt=""
                                        className="h-56 w-full object-cover"
                                        style={{
                                            objectPosition:
                                                project.photoPosition,
                                        }}
                                    />
                                )}
                                <div className="p-6">
                                    {project.pinned && (
                                        <p className="text-xs font-semibold tracking-wide text-brand uppercase">
                                            {t('extras.pinned')}
                                        </p>
                                    )}
                                    <h2 className="mt-1 text-2xl font-semibold">
                                        {project.title}
                                    </h2>
                                    <p className="mt-3 line-clamp-4 text-ink/75">
                                        {project.description}
                                    </p>
                                    <Link
                                        href={`/proyectos/${project.slug}`}
                                        className="mt-4 inline-flex font-semibold text-brand underline-offset-2 hover:underline"
                                    >
                                        {t('extras.readProject')}
                                    </Link>
                                </div>
                            </article>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}
