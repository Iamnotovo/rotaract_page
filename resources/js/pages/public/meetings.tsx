import { Seo } from '@/components/seo';
import { useT } from '@/hooks/use-t';

type ClubEvent = {
    id: number;
    title: string;
    description: string;
    when: string;
    location: string | null;
    mapsUrl: string | null;
};

export default function Meetings({
    address,
    mapEmbed,
    mapLink,
    events,
}: {
    address: string;
    mapEmbed: string;
    mapLink: string;
    events: ClubEvent[];
}) {
    const t = useT();

    return (
        <div className="mx-auto max-w-3xl px-4 py-12">
            <Seo />
            <h1 className="text-4xl font-semibold tracking-tight">
                {t('meetings.pageTitle')}
            </h1>
            <p className="mt-4 text-lg leading-relaxed text-ink/80">
                {t('meetings.lead')}
            </p>

            <section
                className="mt-8 rounded-2xl bg-white p-6 ring-1 ring-black/5"
                aria-labelledby="cuando"
            >
                <h2 id="cuando" className="text-2xl font-semibold">
                    {t('meetings.whenTitle')}
                </h2>
                <dl className="mt-4 grid gap-3 sm:grid-cols-2">
                    <div>
                        <dt className="text-sm text-ink/60">
                            {t('meetings.dayLabel')}
                        </dt>
                        <dd className="text-lg font-medium">
                            {t('meetings.dayValue')}
                        </dd>
                    </div>
                    <div>
                        <dt className="text-sm text-ink/60">
                            {t('meetings.timeLabel')}
                        </dt>
                        <dd className="text-lg font-medium">
                            <time dateTime="20:30">20:30</time>
                            {' – '}
                            <time dateTime="21:30">21:30</time>
                        </dd>
                    </div>
                </dl>
            </section>

            <section
                className="mt-6 rounded-2xl bg-white p-6 ring-1 ring-black/5"
                aria-labelledby="donde"
            >
                <h2 id="donde" className="text-2xl font-semibold">
                    {t('meetings.whereTitle')}
                </h2>
                <address className="mt-3 text-lg not-italic">{address}</address>
                <p className="mt-2 text-ink/70">
                    {t('meetings.addressNoteBefore')}
                    <strong>3º D, 2ª</strong>
                    {t('meetings.addressNoteAfter')}
                </p>
                <iframe
                    title={t('meetings.mapIframeTitle')}
                    className="mt-4 h-72 w-full rounded-xl border-0"
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    src={mapEmbed}
                />
                <a
                    href={mapLink}
                    className="mt-3 inline-flex font-semibold text-brand hover:underline"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    {t('meetings.openMaps')}
                </a>
            </section>

            <section className="mt-10" aria-labelledby="actividades">
                <h2 id="actividades" className="text-2xl font-semibold">
                    {t('extras.eventsTitle')}
                </h2>
                {events.length === 0 ? (
                    <p className="mt-3 text-ink/70">
                        {t('extras.eventsEmpty')}
                    </p>
                ) : (
                    <ul className="mt-4 grid gap-4">
                        {events.map((event) => (
                            <li
                                key={event.id}
                                className="rounded-2xl bg-white p-5 ring-1 ring-black/5"
                            >
                                <h3 className="text-lg font-semibold">
                                    {event.title}
                                </h3>
                                <p className="mt-1 text-sm text-brand">
                                    {event.when}
                                </p>
                                {event.location && (
                                    <p className="mt-1 text-sm">
                                        {event.location}
                                    </p>
                                )}
                                {event.description && (
                                    <p className="mt-3 whitespace-pre-line text-ink/80">
                                        {event.description}
                                    </p>
                                )}
                                {event.mapsUrl && (
                                    <a
                                        className="mt-2 inline-flex text-sm font-semibold text-brand hover:underline"
                                        href={event.mapsUrl}
                                    >
                                        {t('meetings.openMaps')}
                                    </a>
                                )}
                            </li>
                        ))}
                    </ul>
                )}
            </section>
        </div>
    );
}
