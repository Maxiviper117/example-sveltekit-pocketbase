import type { PageServerLoad } from './$types';

export const load = (async ({ locals }) => {
	const vehicleList = await locals.pbAdmin.collection('vehicles').getList(1, 3, {
		filter: 'published = true'
	});

	const collection = await locals.pbAdmin.collections.getOne('vehicles');
	console.log('collection:', collection);

	// console.log('vehicleList:', vehicleList.items);

	// await Promise.all so that 'records' is an Array of resolved items
	// const records = await Promise.all(
	// 	vehicleList.items.map(async (vehicle) => {
	// 		const url = locals.pbAdmin.files.getURL(vehicle, vehicle.featured_image);
	// 		const res = await fetch(url);
	// 		const contentType = res.headers.get('content-type') ?? 'application/octet-stream';
	// 		const arrayBuffer = await res.arrayBuffer();
	// 		const buffer = Buffer.from(arrayBuffer);
	// 		const base64 = buffer.toString('base64');
	// 		const dataUrl = `data:${contentType};base64,${base64}`;

	// 		return {
	// 			...vehicle,
	// 			featured_image: dataUrl
	// 		};
	// 	})
	// );

	const records = await Promise.all(
		vehicleList.items.map(async (vehicle) => {
			// Generate a signed URL (expires in 1 hour)
			// const fileToken = await locals.pbAdmin.files.getToken();
			const signedUrl = locals.pbAdmin.files.getURL(vehicle, vehicle.featured_image)

			console.log('signedUrl:', signedUrl);
			return {
				...vehicle,
				featured_image: signedUrl
			};
		})
	);

	// console.log('vehicleList:', records);

	return { vehicles: records };
}) satisfies PageServerLoad;
