import { usePage } from '@inertiajs/react';

function lookup(tree: unknown, path: string): unknown {
    let current = tree;

    for (const part of path.split('.')) {
        if (
            typeof current !== 'object' ||
            current === null ||
            !(part in current)
        ) {
            return undefined;
        }

        current = (current as Record<string, unknown>)[part];
    }

    return current;
}

export function useT(): (
    path: string,
    vars?: Record<string, string | number>,
) => string {
    const { translations } = usePage().props;

    return (path, vars) => {
        const value = lookup(translations, path);

        if (typeof value !== 'string') {
            return path;
        }

        return Object.entries(vars ?? {}).reduce(
            (text, [key, replacement]) =>
                text.replaceAll(`{{${key}}}`, String(replacement)),
            value,
        );
    };
}
