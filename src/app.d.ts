// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
declare global {
	namespace App {
		// interface Error {}
		interface Locals {
			userAddress?: string; // or maybe a bigger user object
		}
		// interface PageData {}
		// interface PageState {}
		// interface Platform {}
	}
}

export {};
