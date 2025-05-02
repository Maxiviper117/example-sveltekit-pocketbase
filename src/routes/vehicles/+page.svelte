<script lang="ts">
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();
</script>

<section class="flex min-h-screen flex-col items-center justify-center p-4">
	<div class="container mx-auto">
		{#if data.vehicles.length > 0}
			{#each data.vehicles as vehicle}
                <div class="max-w-sm rounded overflow-hidden shadow-lg bg-white m-4">
                    <img class="w-full h-48 object-cover" src={vehicle.featured_image} alt={vehicle.name} />
                    <div class="px-6 py-4">
                        <h2 class="font-bold text-xl mb-2">Vehicle: {vehicle.name}</h2>
                    </div>
                </div>
			{/each}
		{/if}
	</div>
</section>
