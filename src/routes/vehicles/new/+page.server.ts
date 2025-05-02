import type { Actions, PageServerLoad } from './$types';

interface BaseField {
	id: string;
	name: string;
	type: string;
	hidden: boolean;
	required?: boolean;
	system?: boolean;
	presentable?: boolean;
}

interface TextField extends BaseField {
	type: 'text';
	max?: number;
	min?: number;
	pattern?: string;
	autogeneratePattern?: string;
	primaryKey?: boolean;
}

interface FileField extends BaseField {
	type: 'file';
	maxSelect?: number;
	maxSize?: number;
	mimeTypes?: string[];
	protected?: boolean;
	thumbs?: string[];
}

interface BoolField extends BaseField {
	type: 'bool';
}

interface NumberField extends BaseField {
	type: 'number';
	max?: number | null;
	min?: number | null;
	onlyInt?: boolean;
}

interface AutoDateField extends BaseField {
	type: 'autodate';
	onCreate?: boolean;
	onUpdate?: boolean;
}

type Field = TextField | FileField | BoolField | NumberField | AutoDateField;

interface Collection {
	name: string;
	[key: string]: any;
	fields: Field[];
}

const ignoreFields = ['created', 'updated', 'id', 'published'];

export const load: PageServerLoad = async ({ locals }) => {
	const collection = await locals.pbAdmin.collections.getOne('vehicles');
	const filteredFields = (collection.fields as Field[]).filter(
		(field) => !ignoreFields.includes(field.name) && !field.hidden
	);

	filteredFields.forEach((field) => {
		// convert snake_case to normal text
		field.name = field.name.replace(/_/g, ' ');
		// convert to lowercase and capitalize first letter of each word

		field.name = field.name.toLowerCase().replace(/\b\w/g, (char) => char.toUpperCase());
	});

	const col = {
		name: collection.name,
		fields: filteredFields
	} as Collection;

	return {
		collection: col
	};
};

export const actions: Actions = {
	default: async ({ request }) => {
		const formData = await request.formData();
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		const data: Record<string, any> = {};

		// for (const field of collection.fields) {
		// 	if (field.hidden) continue; // skip if you want
		// 	if (field.type === 'file') {
		// 		const file = formData.get(field.name);
		// 		data[field.name] = file instanceof File ? file : null;
		// 	} else if (field.type === 'bool') {
		// 		data[field.name] = formData.has(field.name);
		// 	} else {
		// 		data[field.name] = formData.get(field.name);
		// 	}
		// }

		// here you could insert into your DB, etc.
		console.log('Submitted:', data);

		return { success: true, data };
	}
};
