import type { LayoutServerLoad } from './$types';
import { requireLogin } from '$lib/server/middleware/requireLogin';

export const load = (async () => {
	const user = await requireLogin();

	return {
		user
	};
}) satisfies LayoutServerLoad;
