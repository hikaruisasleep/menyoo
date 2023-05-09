import type { HandleFetch } from '@sveltejs/kit';

export const handleFetch = (async ({ request, fetch }) => {
	if (request.url.startsWith('http://api.menyoo')) {
		// clone the original request, but change the URL
		request = new Request(
			request.url.replace('http://api.menyoo', 'http://localhost:8088'),
			request
		);
	}

	return fetch(request);
}) satisfies HandleFetch;
