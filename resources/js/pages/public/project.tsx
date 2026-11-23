import { Link } from '@inertiajs/react';
import { Seo } from '@/components/seo';
import { useT } from '@/hooks/use-t';
import type { ProjectCard } from '@/pages/public/home';

type ProjectDetail = ProjectCard & {
    whatDone: string;
    whatLearned: string;
    gallery: { id: number; url: string | null }[];
};

export default function ProjectPage({ project }: { project: ProjectDetail }) {
    const t = useT();

    return (
        <article className="mx-auto max-w-3xl px-4 py-12">
            <Seo />
            <Link
                href="/proyectos"
                className="text-sm font-semibold text-brand hover:underline"
            >
                ← {t('extras.backProjects')}
            </Link>
            <h1 className="mt-4 text-4xl font-semibold tracking-tight">
                {project.title}
            </h1>
            {project.photo && (
                <img
                    src={project.photo}
                    alt=""
                    className="mt-6 aspect-[16/9] w-full rounded-2xl object-cover"
                    style={{ objectPosition: project.photoPosition }}
                />
            )}
            <section className="mt-8" aria-labelledby="descripcion">
                <h2 id="descripcion" className="text-xl font-semibold">
                    {t('projectDetail.description')}
                </h2>
                <p className="mt-3 leading-relaxed whitespace-pre-line text-ink/80">
                    {project.description}
                </p>
            </section>
            {project.whatDone && (
                <section className="mt-8" aria-labelledby="hecho">
                    <h2 id="hecho" className="text-xl font-semibold">
                        {t('projectDetail.whatDone')}
                    </h2>
                    <p className="mt-3 leading-relaxed whitespace-pre-line text-ink/80">
                        {project.whatDone}
                    </p>
                </section>
            )}
            {project.whatLearned && (
                <section className="mt-8" aria-labelledby="aprendizaje">
                    <h2 id="aprendizaje" className="text-xl font-semibold">
                        {t('projectDetail.whatLearned')}
                    </h2>
                    <p className="mt-3 leading-relaxed whitespace-pre-line text-ink/80">
                        {project.whatLearned}
                    </p>
                </section>
            )}
            {project.gallery.length > 0 && (
                <section className="mt-8" aria-labelledby="galeria">
                    <h2 id="galeria" className="text-xl font-semibold">
                        {t('projectDetail.gallery')}
                    </h2>
                    <ul className="mt-4 grid gap-3 sm:grid-cols-2">
                        {project.gallery.map((photo, index) =>
                            photo.url ? (
                                <li key={photo.id}>
                                    <img
                                        src={photo.url}
                                        alt={t('projectDetail.photoAlt', {
                                            n: index + 1,
                                        })}
                                        className="w-full rounded-xl object-cover"
                                    />
                                </li>
                            ) : null,
                        )}
                    </ul>
                </section>
            )}
        </article>
    );
}
