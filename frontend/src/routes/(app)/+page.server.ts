import type { PageServerLoad } from './$types';
import * as api from '$lib/server/api';

async function objForEach<T>(obj: T, f: (k: keyof T, v: T[keyof T]) => Promise<T>): Promise<any[]> {
    let ret: any[] = [];
    for (let k in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, k)) {
            let o = await f(k, obj[k]);
            ret.push(o);
        }
    }
    return ret;
}

export const load = (async () => {
    let vendors = await (await api.getAllVendors()).json();
    
    return {
        vendors: vendors,
    };
}) satisfies PageServerLoad;
