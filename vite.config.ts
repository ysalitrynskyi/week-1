import { defineConfig } from 'vite';
import { sveltekit } from '@sveltejs/kit/vite';

export default defineConfig({
	plugins: [sveltekit()],
	resolve: {
		alias: {
			'@farcaster/frame-sdk': '@farcaster/frame-sdk/dist/index.js',
		},
	},
	optimizeDeps: {
		include: ['@farcaster/frame-sdk'],
		esbuildOptions: {
			target: 'esnext',
		},
	},
});
