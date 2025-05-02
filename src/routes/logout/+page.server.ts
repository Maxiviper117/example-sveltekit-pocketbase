import type { Actions } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { redirect } from '@sveltejs/kit';

export const load = (async () => {
	return {};
}) satisfies PageServerLoad;

export const actions: Actions = {
	default: async ({ locals }) => {
		locals.pb.authStore.clear();

		throw redirect(303, '/login');
	}
};
