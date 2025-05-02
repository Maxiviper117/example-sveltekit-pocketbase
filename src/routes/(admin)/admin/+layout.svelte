<script lang="ts">
	import type { Snippet } from 'svelte';
	import type { LayoutData } from './$types';
	import '../../../app.css';

	let { data, children }: { data: LayoutData; children: Snippet } = $props();
</script>

<nav class=" flex items-center justify-between bg-gray-800 p-4">
	<div class="text-lg font-bold">
		<p class="text-white">Admin Panel</p>
	</div>
	{#if data.user}
		<form method="POST" action="/logout">
			<button
				type="submit"
				class="rounded bg-red-600 px-4 py-2 font-semibold text-white transition-colors hover:bg-red-700"
			>
				Logout
			</button>
		</form>
	{/if}
</nav>

{@render children()}
