import { error } from '@sveltejs/kit';

const externApiUri = 'http://localhost:8088';

export async function login(user?: string, pw?: string) {
    return await fetch(`${externApiUri}/private/admin/login`, {
        method: 'POST',
        headers: {
            'content-type': 'application/json',
        },
        body: JSON.stringify({ location: user, password: pw }),
    });
}

export async function getUser(token?: string) {
    token = token ? token : '';

    return await fetch(`${externApiUri}/private/vendors`, {
        method: 'GET',
        headers: {
            'x-access-token': token,
        },
    });
}

export async function getAllItems() {
    return await fetch(`${externApiUri}/public/items`, {
        method: 'GET',
        headers: {
            'z-request-type': 'all',
        },
    });
}

export async function getItemsByVendor(vendor_id: string) {
    return await fetch(`${externApiUri}/public/items`, {
        method: 'GET',
        headers: {
            'z-request-type': 'by_vendor',
            'z-vendor-id': vendor_id,
        },
    });
}

export async function getVendorNameFromID(vendor_id: string) {
    return await fetch(`${externApiUri}/public/vendors`, {
        method: 'GET',
        headers: {
            'z-vendor-id': vendor_id,
        },
    });
}

export async function getItemByID(item_id?: string) {
    if (!item_id) throw error(404, 'Item not found');
    return await fetch(`${externApiUri}/public/items`, {
        method: 'GET',
        headers: {
            'z-request-type': 'by_id',
            'z-item-id': item_id,
        },
    });
}

export async function addItem(
    token: string,
    type: boolean,
    name?: string,
    price?: number,
    desc?: string
) {
    token = token ? token : '';

    return await fetch(`${externApiUri}/private/items`, {
        method: 'POST',
        headers: {
            'content-type': 'application/json',
            'x-access-token': token,
        },
        body: JSON.stringify({
            name: name,
            price: price,
            description: desc,
            type: type,
        }),
    });
}

export async function editItem(
    token: string,
    id: string,
    type: boolean,
    name?: string,
    price?: number,
    desc?: string
) {
    return await fetch(`${externApiUri}/items`, {
        method: 'PUT',
        headers: {
            'content-type': 'application/json',
            'x-access-token': token,
        },
        body: JSON.stringify({
            id: id,
            query: {
                name: name,
                price: price,
                description: desc,
                type: type,
            },
        }),
    });
}

export async function deleteItem(token?: string, id?: string) {
    token = token ? token : '';

    return await fetch(`${externApiUri}/items`, {
        method: 'DELETE',
        headers: {
            'content-type': 'application/json',
            'x-access-token': token,
        },
        body: JSON.stringify({
            id: id,
        }),
    });
}
