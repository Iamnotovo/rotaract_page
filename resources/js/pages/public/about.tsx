import { Seo } from '@/components/seo';
import { useT } from '@/hooks/use-t';

export default function About() {
    const t = useT();
    const instagram = 'https://www.instagram.com/rotaractdiagonal/';

    return (
        <div className="mx-auto max-w-3xl px-4 py-12">
            <Seo />
            <h1 className="text-4xl font-semibold tracking-tight">
                {t('about.pageTitle')}
            </h1>
            <p className="mt-6 text-lg leading-relaxed">
                {t('about.introBefore')}
                <strong>{t('about.introEmphasis')}</strong>
                {t('about.introAfter')}
            </p>

            <section className="mt-10" aria-labelledby="origen">
                <h2 id="origen" className="text-2xl font-semibold">
                    {t('about.originTitle')}
                </h2>
                <p className="mt-3 leading-relaxed text-ink/80">
                    {t('about.originP1Before')}
                    <strong>{t('about.originP1Strong')}</strong>
                    {t('about.originP1After')}
                </p>
                <p className="mt-3 leading-relaxed text-ink/80">
                    {t('about.originP2')}
                </p>
            </section>

            <section
                className="mt-10 rounded-2xl bg-white p-6 ring-1 ring-black/5"
                aria-labelledby="crecimiento"
            >
                <h2 id="crecimiento" className="text-2xl font-semibold">
                    {t('about.growthTitle')}
                </h2>
                <p className="mt-3 leading-relaxed text-ink/80">
                    {t('about.growthLeadBefore')}
                    <strong>{t('about.growthLeadStrongFour')}</strong>
                    {t('about.growthLeadMid')}
                    <strong>{t('about.growthLeadStrongTwenty')}</strong>
                    {t('about.growthLeadAfter')}
                </p>
                <p className="mt-3 leading-relaxed text-ink/80">
                    {t('about.growthP2')}
                </p>
            </section>

            <section className="mt-10" aria-labelledby="espiritu">
                <h2 id="espiritu" className="text-2xl font-semibold">
                    {t('about.spiritTitle')}
                </h2>
                <ul className="mt-4 grid gap-4">
                    {[
                        ['about.handsOnLabel', 'about.handsOnText'],
                        ['about.welcomingLabel', 'about.welcomingText'],
                        ['about.heartLabel', 'about.heartText'],
                    ].map(([label, text]) => (
                        <li
                            key={label}
                            className="rounded-2xl bg-white p-5 ring-1 ring-black/5"
                        >
                            <p className="font-semibold text-brand">
                                {t(label)}
                            </p>
                            <p className="mt-1 text-ink/80">{t(text)}</p>
                        </li>
                    ))}
                </ul>
            </section>

            <section className="mt-10" aria-labelledby="gracias">
                <h2 id="gracias" className="text-2xl font-semibold">
                    {t('about.thanksTitle')}
                </h2>
                <p className="mt-3 leading-relaxed text-ink/80">
                    {t('about.thanksP1Before')}
                    <strong>{t('about.thanksP1Club')}</strong>
                    {t('about.thanksP1After')}
                </p>
                <p className="mt-3 leading-relaxed text-ink/80">
                    {t('about.thanksP2Before')}
                    <strong>{t('about.thanksP2Club')}</strong>
                    {t('about.thanksP2After')}
                </p>
            </section>

            <section
                className="mt-10 rounded-2xl bg-brand p-6 text-white"
                aria-labelledby="visita"
            >
                <h2 id="visita" className="text-2xl font-semibold">
                    {t('about.visitTitle')}
                </h2>
                <p className="mt-3 leading-relaxed">
                    {t('about.visitLeadBefore')}
                    <strong>{t('about.visitStrongWhen')}</strong>
                    {t('about.visitMidAt')}
                    <strong>{t('about.visitStrongWhere')}</strong>
                    {t('about.visitOutroBefore')}
                    <a
                        className="underline"
                        href={instagram}
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        {t('about.visitInstagramLink')}
                    </a>
                    {t('about.visitOutroAfter')}
                </p>
            </section>
        </div>
    );
}
