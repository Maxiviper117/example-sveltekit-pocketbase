// src/hooks.server.js
import { pocketbaseHandle } from '$lib/server/middleware/pocketbaseAuth';
import { sequence } from '@sveltejs/kit/hooks';

export const handle = sequence(pocketbaseHandle);
