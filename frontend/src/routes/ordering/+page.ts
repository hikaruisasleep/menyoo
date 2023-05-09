import type { PageLoad } from "./$types";

export const load = (() => {
    return {
            title: 'Invalid address',
            content: 'Click <a href="/ordering/menu">here</a> to redirect',
    };
}) satisfies PageLoad;