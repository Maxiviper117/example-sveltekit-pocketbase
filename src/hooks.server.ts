// src/hooks.server.js
import { pocketbaseMiddleware } from '$lib/server/middleware/pocketbaseAuth';
import type { Handle } from '@sveltejs/kit';

// import PocketBase from 'pocketbase';

// export const handle2: Handle = async ({ event, resolve }) => {
// 	const POCKETBASE_URL = process.env.POCKETBASE_URL || 'http://127.0.0.1:8090';
// 	// Initialize PocketBase client for this request
// 	event.locals.pb = new PocketBase(POCKETBASE_URL);

// 	// Load session data from 'pb_auth' cookie, if present
// 	event.locals.pb.authStore.loadFromCookie(event.request.headers.get('cookie') || '');

// 	try {
// 		// If a session exists, try to refresh it; on failure clear the auth store
// 		if (event.locals.pb.authStore.isValid) {
// 			await event.locals.pb.collection('users').authRefresh();
// 		}
// 		// eslint-disable-next-line @typescript-eslint/no-unused-vars
// 	} catch (_) {
// 		// clear the auth store on failed refresh
// 		event.locals.pb.authStore.clear();
// 	}

// 	// Resolve runs route logic and actions, e.g., login, which may mutate authStore
// 	const response = await resolve(event);

// 	// Export updated authStore into a Set-Cookie header ('pb_auth') for the client
// 	const pb_auth = event.locals.pb.authStore.exportToCookie(); // if logging in, this will be populated with the auth token and user data
// 	// console.log('pb_auth:', pb_auth);
// 	response.headers.append('set-cookie', pb_auth); // instructs the browser to store the cookie

// 	return response;
// };
export const handle: Handle = async ({ event, resolve }) => {
	await pocketbaseMiddleware();

	const response = await resolve(event);

	(await pocketbaseMiddleware()).setCookie(response);

	return response;
};
