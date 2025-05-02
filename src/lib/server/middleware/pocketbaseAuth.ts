// src/lib/server/pocketbase.ts
import PocketBase from 'pocketbase';
import { getRequestEvent } from '$app/server';

/**
 * A SvelteKit Handle middleware that
 * 1. Instantiates a PocketBase client per request
 * 2. Loads and refreshes the authStore from cookie
 * 3. Persists any changes to authStore back to the response
 *
 * @example
 * export const handle: Handle = async ({ event, resolve }) => {
 *     await pocketbaseMiddleware();
 *
 *     const response = await resolve(event);
 *
 *     (await pocketbaseMiddleware()).setCookie(response);
 *
 *     return response;
 * };
 */
export const pocketbaseMiddleware = async () => {
	const POCKETBASE_URL = process.env.POCKETBASE_URL || 'http://127.0.0.1:8090';
	const event = getRequestEvent();
	const { locals, request } = event;
	// 1. init client
	locals.pb = new PocketBase(POCKETBASE_URL);

	// 2. load from cookie
	const cookieHeader = request.headers.get('cookie') || '';
	locals.pb.authStore.loadFromCookie(cookieHeader);

	// 3. try refresh or clear
	if (locals.pb.authStore.isValid) {
		try {
			await locals.pb.collection('users').authRefresh();
		} catch {
			locals.pb.authStore.clear();
		}
	}

	// 5. write back Set‑Cookie
	const pbCookie = locals.pb.authStore.exportToCookie();

	return {
		setCookie: (response: Response) => {
			response.headers.append('set-cookie', pbCookie);
		}
	};
};
