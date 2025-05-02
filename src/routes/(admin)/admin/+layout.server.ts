import { redirect } from '@sveltejs/kit';
import type { LayoutServerLoad } from './$types';

export const load = (async ({ locals }) => {
	if (!locals.pb.authStore.isValid) {
		locals.pb.authStore.clear();
		throw redirect(303, '/login');
	}

	const user = locals.pb.authStore.record;

	// console.log('User:', user);
	return {
		user
	};
}) satisfies LayoutServerLoad;
