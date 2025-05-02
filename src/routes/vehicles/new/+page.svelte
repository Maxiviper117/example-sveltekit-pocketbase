<script lang="ts">
	import { enhance } from '$app/forms';
	// optional: handle client feedback
	// const options = {
	// 	// after a successful submit, re‑invalidate the page so you see updated data
	// 	result({ result }) {
	// 		if (result.success) invalidate();
	// 	}
	// };

	import { invalidate } from '$app/navigation';
	let recorddata: {
		collection: {
			name: string;
			fields: {
				id: string;
				name: string;
				type: string;
				required: boolean;
				hidden: boolean;
				min?: number;
				max?: number;
				pattern?: string;
			}[];
		};
	};

	let { data } = $props();
</script>

<div class="container mx-auto flex flex-col items-center justify-center p-4">
	<div class="w-full max-w-lg bg-stone-100">
		{#if data.collection}
			<form
				action="?/default"
				method="post"
				enctype="multipart/form-data"
				use:enhance
				class="w-full space-y-6 rounded p-8 shadow-md"
			>
				{#each data.collection.fields as field}
					{#if !field.hidden}
						<div class="mb-4">
							<label for={field.name} class="mb-2 block font-semibold text-gray-700 capitalize">
								{field.name}
								{#if field.required}
									<span class="text-red-500">*</span>
								{/if}
							</label>

							{#if field.type === 'text'}
								<input
									id={field.name}
									name={field.name}
									type="text"
									required={field.required}
									minlength={field.min}
									maxlength={field.max}
									pattern={field.pattern}
									class="w-full rounded border border-gray-300 bg-white px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
								/>
							{:else if field.type === 'number'}
								<input
									id={field.name}
									name={field.name}
									type="number"
									required={field.required}
									min={field.min}
									max={field.max}
									class="w-full rounded border border-gray-300 bg-white px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
								/>
							{:else if field.type === 'bool'}
								<input
									id={field.name}
									name={field.name}
									type="checkbox"
									class="mr-2 accent-blue-600"
								/>
							{:else if field.type === 'file'}
								<input
									id={field.name}
									name={field.name}
									type="file"
									required={field.required}
									class="block w-full text-gray-700"
								/>
							{:else if field.type === 'autodate'}
								<input
									id={field.name}
									name={field.name}
									type="text"
									readonly
									value="will be set automatically"
									class="w-full rounded border border-gray-200 bg-gray-100 px-3 py-2 text-gray-500"
								/>
							{/if}
						</div>
					{/if}
				{/each}

				<button
					type="submit"
					class="w-full rounded bg-blue-600 px-4 py-2 font-bold text-white transition hover:bg-blue-700"
				>
					Save {data.collection.name}
				</button>
			</form>
		{/if}
	</div>
</div>
