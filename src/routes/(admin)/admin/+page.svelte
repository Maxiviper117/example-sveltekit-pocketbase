<script lang="ts">
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();
</script>

{#if data.user}
	<div class="flex min-h-screen items-center justify-center bg-gray-100">
		<div class="w-full max-w-sm space-y-4 rounded bg-white p-8 shadow-md">
			<h1 class="mb-4 text-center text-2xl font-bold">Admin</h1>
			{#if data.user}
				<p class="text-center text-lg">Welcome, {data.user.email}</p>
			{:else}
				<p class="text-center text-lg">You are not logged in.</p>
			{/if}
		</div>
	</div>
{/if}
