// import adapter from '@sveltejs/adapter-auto';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';
import preprocessReact from "svelte-preprocess-react/preprocessReact";
import adapter from '@sveltejs/adapter-node';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	preprocess: [vitePreprocess(), preprocessReact()],
	kit: {
		adapter: adapter() // Automatically selects the best adapter for your environment
	}
};

export default config;
