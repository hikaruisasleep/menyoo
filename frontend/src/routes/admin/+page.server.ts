import type { PageServerLoad } from './$types';
import * as api from '$lib/server/api';

export const load = (async (event) => {
	console.log(event.cookies.getAll());
	let token = event.cookies.get('logintoken')?.toString();
	let response = await api.getUser(token);

	let s = response.ok ? true : false;
	let r = await response.json();

	let itemsList;

	if (s) {
		itemsList = await (await api.getItemsByVendor(r._id)).json();
	}

	let payload = { success: s, res: r, items: itemsList };

	return payload;
}) satisfies PageServerLoad;
