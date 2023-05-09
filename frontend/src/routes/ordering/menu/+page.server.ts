import type { PageServerLoad } from './$types';
import * as api from '$lib/server/api';

export const load = (async () => {
	let itemsList = await (await api.getAllItems()).json();
	console.log(itemsList);
	return {
		items: itemsList
	};
}) satisfies PageServerLoad;
