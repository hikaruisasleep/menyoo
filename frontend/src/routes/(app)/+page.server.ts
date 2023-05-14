import type { PageServerLoad } from './(menu)/$types';
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
    let items = await (await api.getAllItems()).json();
    let itemsList: any[] = [];

    let i = await objForEach(items, async (k, v) => {
        let vID = v.vendor_id;
        let vendorName = (await (await api.getVendorNameFromID(vID)).json()).name;
        v.vendor_name = vendorName;
        return v;
    });

    itemsList = i;

    return {
        items: itemsList,
    };
}) satisfies PageServerLoad;
