import type { RequestHandler } from './$types';

export const POST: RequestHandler = async ({ request, locals }) => {
	const { email, password } = await request.json();

	const { token, record } = await locals.pb.collection('users').authWithPassword(email, password);

	// Export the auth cookie after login
	const pbAuthCookie = locals.pb.authStore.exportToCookie();

	return new Response(
		JSON.stringify({
			token,
			record: {
				id: record.id,
				email: record.email,
				created: record.created,
				updated: record.updated
			}
		}),
		{
			headers: {
				'Content-Type': 'application/json',
				'Set-Cookie': pbAuthCookie // Set the auth cookie for the client
			}
		}
	);
};
