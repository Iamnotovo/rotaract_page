import { Form, Head, Link } from '@inertiajs/react';
import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

type MemberFormData = {
    id: number;
    name: string;
    role: string;
    photo: string | null;
    boardOrder: number | null;
    sortOrder: number;
};

export default function MemberFormPage({
    member,
    roles,
}: {
    member: MemberFormData | null;
    roles: { value: string; label: string }[];
}) {
    return (
        <div className="mx-auto flex max-w-xl flex-col gap-4 p-4">
            <Head title={member ? 'Editar miembro' : 'Nuevo miembro'} />
            <h1 className="text-2xl font-semibold">
                {member ? 'Editar miembro' : 'Nuevo miembro'}
            </h1>
            <Form
                action={
                    member ? `/admin/miembros/${member.id}` : '/admin/miembros'
                }
                method={member ? 'put' : 'post'}
                className="grid gap-4"
            >
                {({ errors, processing }) => (
                    <>
                        <div className="grid gap-2">
                            <Label htmlFor="name">Nombre</Label>
                            <Input
                                id="name"
                                name="name"
                                required
                                defaultValue={member?.name ?? ''}
                            />
                            <InputError message={errors.name} />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="role">Cargo</Label>
                            <select
                                id="role"
                                name="role"
                                defaultValue={member?.role ?? 'member'}
                                className="h-9 rounded-md border border-input px-2 text-sm"
                            >
                                {roles.map((role) => (
                                    <option key={role.value} value={role.value}>
                                        {role.label}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="photo">Foto</Label>
                            {member?.photo && (
                                <img
                                    src={member.photo}
                                    alt=""
                                    className="size-24 rounded-full object-cover"
                                />
                            )}
                            <input
                                id="photo"
                                name="photo"
                                type="file"
                                accept="image/*"
                            />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="board_order">
                                Puesto en la junta (vacío si no forma parte)
                            </Label>
                            <Input
                                id="board_order"
                                name="board_order"
                                type="number"
                                min={0}
                                max={11}
                                defaultValue={member?.boardOrder ?? ''}
                            />
                            <InputError message={errors.board_order} />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="sort_order">Orden</Label>
                            <Input
                                id="sort_order"
                                name="sort_order"
                                type="number"
                                min={0}
                                defaultValue={member?.sortOrder ?? 0}
                            />
                        </div>
                        <div className="flex gap-2">
                            <Button type="submit" disabled={processing}>
                                Guardar
                            </Button>
                            <Button variant="outline" asChild>
                                <Link href="/admin/miembros">Volver</Link>
                            </Button>
                        </div>
                    </>
                )}
            </Form>
        </div>
    );
}
