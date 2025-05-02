import { redirect } from '@sveltejs/kit';
import { getRequestEvent } from '$app/server';

export async function requireLogin() {
	const { locals, url } = getRequestEvent();

	if (!locals.pb.authStore.isValid) {
		locals.pb.authStore.clear();
		const location = new URL('/login', url.origin);
		location.searchParams.set('redirectTo', url.pathname);

		redirect(307, location);
	}

	return locals.pb.authStore.record;
}
