import type { Actions } from './$types';
import * as api from '$lib/server/api';
import { error, redirect } from '@sveltejs/kit';

export const actions = {
	login: async (event) => {
		const data = await event.request.formData();
		let login = data.get('login');
		let password = data.get('password');

		let response = await api.login(login?.toString(), password?.toString());

		let s = response.ok ? true : false;
		let r = await response.json();

		if (s) {
			event.cookies.set('logintoken', r.token, { secure: false });
			console.log(event.cookies.getAll());
			throw redirect(302, '/admin');
		} else {
			return { success: s, err: r.error };
		}
	},
	logout: async (event) => {
		try {
			event.cookies.delete('logintoken');
			return { res: 'Successfully logged out' };
		} catch (e) {
			throw error(500, 'Internal server error');
		}
	}
} satisfies Actions;
