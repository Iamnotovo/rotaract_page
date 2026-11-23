import InputError from '@/components/input-error';
import { Label } from '@/components/ui/label';

export type Translated = { es: string; en: string; ca: string };

const LOCALES = [
    ['es', 'Español'],
    ['en', 'English'],
    ['ca', 'Català'],
] as const;

export function TranslationFields({
    name,
    label,
    values,
    errors,
    multiline = false,
    required = false,
}: {
    name: string;
    label: string;
    values: Translated;
    errors: Record<string, string | undefined>;
    multiline?: boolean;
    required?: boolean;
}) {
    return (
        <fieldset className="grid gap-3 rounded-lg border p-4">
            <legend className="px-1 text-sm font-medium">{label}</legend>
            {LOCALES.map(([code, caption]) => (
                <div key={code} className="grid gap-1">
                    <Label htmlFor={`${name}-${code}`}>
                        {caption}
                        {required && code === 'es' ? ' *' : ''}
                    </Label>
                    {multiline ? (
                        <textarea
                            id={`${name}-${code}`}
                            name={`${name}[${code}]`}
                            defaultValue={values[code]}
                            required={required && code === 'es'}
                            rows={name === 'body' ? 10 : 4}
                            className="w-full rounded-md border border-input px-3 py-2 text-sm"
                        />
                    ) : (
                        <input
                            id={`${name}-${code}`}
                            name={`${name}[${code}]`}
                            defaultValue={values[code]}
                            required={required && code === 'es'}
                            className="h-9 w-full rounded-md border border-input px-3 text-sm"
                        />
                    )}
                    <InputError message={errors[`${name}.${code}`]} />
                </div>
            ))}
        </fieldset>
    );
}

export const emptyTranslation = (): Translated => ({ es: '', en: '', ca: '' });
