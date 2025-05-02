<script lang="ts">
	import { dev } from '$app/environment';
	import { enhance } from '$app/forms';

	let email = $state('example@example.com');
	let password = $state('');

	let register = $state(false);

	let { form } = $props();
	import Inspect from 'svelte-inspect-value';

	$effect(() => {
		if (form?.success) {
			setTimeout(() => {
				register = false;
				form = null;
			}, 3000);
		}
	});
</script>

{#if dev}
	<!-- content here -->
	<Inspect bind:value={form} />
{/if}

<div class="flex min-h-screen items-center justify-center bg-gray-100">
	<form
		method="POST"
		class="w-full max-w-sm space-y-4 rounded bg-white p-8 shadow-md"
		use:enhance
		action={register ? '?/signup' : '?/login'}
	>
		<h1 class="mb-4 text-center text-2xl font-bold uppercase">
			{register ? 'Register' : 'Login'}
		</h1>
		{#if form?.success}
			<div class="rounded bg-green-100 p-2 text-sm text-green-700">{form?.message}</div>
		{/if}
		{#if form?.error}
			<div class="rounded bg-red-100 p-2 text-sm text-red-700">{form?.message}</div>
		{/if}
		<div>
			<label class="mb-1 block font-medium" for="email">Email</label>
			<input
				class="w-full rounded border px-3 py-2 focus:border-blue-300 focus:ring focus:outline-none"
				id="email"
				name="email"
				type="email"
				bind:value={email}
				autocomplete="email"
			/>
		</div>
		<div>
			<label class="mb-1 block font-medium" for="password">Password</label>
			<input
				class="w-full rounded border px-3 py-2 focus:border-blue-300 focus:ring focus:outline-none"
				id="password"
				name="password"
				type="password"
				bind:value={password}
				autocomplete="current-password"
			/>
		</div>
		{#if register}
			<div>
				<label class="mb-1 block font-medium" for="passwordConfirm">Confirm Password</label>
				<input
					class="w-full rounded border px-3 py-2 focus:border-blue-300 focus:ring focus:outline-none"
					id="passwordConfirm"
					name="passwordConfirm"
					type="password"
					autocomplete="new-password"
				/>
			</div>
		{/if}
		<button
			class="w-full rounded bg-blue-600 py-2 font-semibold text-white transition-colors hover:bg-blue-700"
			type="submit"
		>
			{register ? 'Register' : 'Login'}
		</button>
		{#if !register}
			<p class="text-center text-sm text-gray-600">
				Don't have an account?
				<button
					type="button"
					class="m-0 cursor-pointer border-none bg-transparent p-0 text-blue-600 hover:underline"
					onclick={() => (register = true)}
				>
					Register
				</button>
			</p>
		{:else}
			<p class="text-center text-sm text-gray-600">
				Already have an account?
				<button
					type="button"
					class="m-0 cursor-pointer border-none bg-transparent p-0 text-blue-600 hover:underline"
					onclick={() => (register = false)}
				>
					Login
				</button>
			</p>
		{/if}
	</form>
</div>
