// See https://svelte.dev/docs/kit/types#app.d.ts
// for information about these interfaces

// import PocketBase from 'pocketbase';
import { type TypedPocketBase } from '$lib/types/pocketbase-types';

declare global {
	namespace App {
		// interface Error {}
		interface Locals {
			pbUser: TypedPocketBase;
			pbAdmin: TypedPocketBase;
			user: import('pocketbase').Record | null;
		}

		// interface PageData {}
		// interface PageState {}
		// interface Platform {}
	}
}

export {};
