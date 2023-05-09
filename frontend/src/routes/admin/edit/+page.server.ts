import type { Actions, PageServerLoad } from './$types';
import * as api from '$lib/server/api';
import { error, redirect } from '@sveltejs/kit';

export const load = (({ url }) => {
    let mode = url.searchParams.get('mode');
    let id = url.searchParams.get('id');
    let item: any | null;

    if (mode === 'edit') {
        item = api.getItemByID(id?.toString());
    } else {
        item = {
            name: '',
            price: '',
            description: '',
            type: true,
        };
    }

    return {
        mode: mode,
        id: id,
        item: item,
    };
}) satisfies PageServerLoad;

export const actions = {
    new: async (event) => {
        let token = event.cookies.get('logintoken');
        const data = await event.request.formData();
        let name = data.get('name')?.toString();
        let priceString = data.get('price')?.toString();
        priceString = priceString ? priceString : '0';
        let price = parseInt(priceString);
        let desc = data.get('desc')?.toString();
        let typeString = data.get('type')?.toString();
        let type = typeString == 'on' ? true : false;

        if (!token) {
            throw error(401, 'Invalid cookies');
        }

        let response = await api.addItem(token, type, name, price, desc);

        let s = response.ok ? true : false;
        let r = await response.json();

        if (s) {
            throw redirect(301, '/admin/edit?mode=new');
        } else {
            return { success: s, err: r.error };
        }
    },
    edit: async (event) => {
        let token = event.cookies.get('logintoken');
        const data = await event.request.formData();
        let id = data.get('id')?.toString();

        let name = data.get('name')?.toString();
        let priceString = data.get('price')?.toString();
        priceString = priceString ? priceString : '0';
        let price = parseInt(priceString);
        let desc = data.get('desc')?.toString();
        let typeString = data.get('type')?.toString();
        let type = typeString == 'on' ? true : false;

        if (!token) {
            throw error(401, 'Invalid cookies');
        }

        if (!id) {
            throw error(404, 'Item not found');
        }

        let response = await api.editItem(token, id, type, name, price, desc);

        let s = response.ok ? true : false;
        let r = await response.json();

        if (s) {
            throw redirect(301, '/admin/edit?mode=edit');
        } else {
            return { success: s, err: r.error };
        }
    },
    delete: async (event) => {
        let token = event.cookies.get('logintoken');
        const data = await event.request.formData();
        let id = data.get('id')?.toString();

        if (!token) {
            throw error(401, 'Invalid cookies');
        }

        let response = await api.deleteItem(token, id);

        let s = response.ok ? true : false;
        let r = await response.json();

        if (s) {
            throw redirect(300, '/admin');
        } else {
            return { success: s, err: r.error };
        }
    },
} satisfies Actions;
