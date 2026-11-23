import { Seo } from '@/components/seo';
import { useT } from '@/hooks/use-t';

type MemberCard = {
    id: number;
    name: string;
    roleLabel: string;
    photo: string | null;
};

function initials(name: string): string {
    return name
        .split(' ')
        .filter(Boolean)
        .slice(0, 2)
        .map((part) => part[0]?.toUpperCase() ?? '')
        .join('');
}

function Card({ member }: { member: MemberCard }) {
    return (
        <article className="overflow-hidden rounded-2xl bg-white text-center shadow-sm ring-1 ring-black/5">
            {member.photo ? (
                <img
                    src={member.photo}
                    alt=""
                    className="aspect-square w-full object-cover"
                />
            ) : (
                <div className="flex aspect-square items-center justify-center bg-brand/10 text-3xl font-semibold text-brand">
                    {initials(member.name)}
                </div>
            )}
            <div className="p-4">
                <h3 className="font-semibold">{member.name}</h3>
                <p className="text-sm text-brand">{member.roleLabel}</p>
            </div>
        </article>
    );
}

export default function Members({
    board,
    members,
}: {
    board: MemberCard[];
    members: MemberCard[];
}) {
    const t = useT();

    return (
        <div className="mx-auto max-w-6xl px-4 py-12">
            <Seo />
            <h1 className="text-4xl font-semibold tracking-tight">
                {t('membersPage.pageTitle')}
            </h1>
            <section className="mt-8" aria-labelledby="junta">
                <h2 id="junta" className="text-2xl font-semibold">
                    {t('membersPage.directionHeading')}
                </h2>
                <ul className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
                    {board.map((member) => (
                        <li key={member.id}>
                            <Card member={member} />
                        </li>
                    ))}
                </ul>
            </section>
            <section className="mt-12" aria-labelledby="socios">
                <h2 id="socios" className="text-2xl font-semibold">
                    {t('membersPage.membersHeading')}
                </h2>
                {members.length === 0 ? (
                    <p className="mt-3 text-ink/70">
                        {t('membersPage.noOthers')}
                    </p>
                ) : (
                    <ul className="mt-4 grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                        {members.map((member) => (
                            <li key={member.id}>
                                <Card member={member} />
                            </li>
                        ))}
                    </ul>
                )}
            </section>
        </div>
    );
}
