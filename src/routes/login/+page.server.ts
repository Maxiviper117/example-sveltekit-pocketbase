import type { Actions } from './$types';
import { fail, redirect } from '@sveltejs/kit';

export const actions: Actions = {
	login: async ({ request, locals }) => {
		const form = await request.formData();
		const email = String(form.get('email'));
		const password = String(form.get('password'));

		console.log('Username:', email);
		console.log('Password:', password);

		try {
			const result = await locals.pb.collection('users').authWithPassword(email, password);
			console.log('Result:', result);
			// console.log('User:', locals.pb.authStore.record);
			// if (locals.pb.authStore.isValid) {
			// 	console.log('User is valid:', locals.pb.authStore.isValid);
			// 	await locals.pb.collection('users').authRefresh();
			// } else {
			// 	locals.pb.authStore.clear();
			// }
		} catch (err) {
			console.error('Error:', err);
			return fail(400, {
				message: 'Invalid username or password',
				error: err instanceof Error ? err.message : String(err)
			});
		}

		throw redirect(303, '/');
	},
	signup: async ({ request, locals }) => {
		const form = await request.formData();
		const email = String(form.get('email'));
		const password = String(form.get('password'));
		const passwordConfirm = String(form.get('passwordConfirm'));

		console.log('Email:', {
			email,
			password,
			passwordConfirm
		});

		// create a new user
		try {
			// const user = await locals.pb.collection('users').create({
			// 	email,
			// 	password,
			// 	passwordConfirm
			// });
			return {
				success: true,
				message: 'User created successfully'
			};
		} catch (err) {
			console.error('Error:', err);
			return fail(400, {
				message: 'Error creating user',
				error: err instanceof Error ? err.message : String(err)
			});
		}
	}
};
