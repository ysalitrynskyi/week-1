<script lang="ts">
	import { ArrowRightIcon } from 'lucide-svelte';
	import AnimatedShinyText from '$lib/components/magic/AnimatedShinyText/AnimatedShinyText.svelte';
	import Button from '$lib/components/ui/button/button.svelte';
	import {connected, wagmiLoaded, web3Modal} from 'svelte-wagmi';

	function openModal() {
		$web3Modal.open();
	}
</script>

<section id="hero" class="relative mx-auto mt-32 mb-32 max-w-7xl px-6 text-center md:px-8">
	<a
		href="https://farcaster-frames.com/"
		target="_blank"
		class="backdrop-filter-[12px] group inline-flex h-7 -translate-y-4 animate-fade-in items-center justify-between gap-1 rounded-full border border-white/5 bg-white/10 px-3 text-xs text-white opacity-0 transition-all ease-in hover:cursor-pointer hover:bg-white/20 dark:text-black"
	>
		<AnimatedShinyText class="inline-flex items-center justify-center">
			<span>Built for Farcaster V2 Frames</span>
			{' '}
			<ArrowRightIcon
				class="ml-1 size-3 transition-transform duration-300 ease-in-out group-hover:translate-x-0.5"
			/>
		</AnimatedShinyText>
	</a>
	<h1
		class="-translate-y-4 animate-fade-in text-balance bg-gradient-to-br from-black from-30% to-black/40 bg-clip-text py-6 text-5xl font-medium leading-none tracking-tighter text-transparent opacity-0 [--animation-delay:200ms] dark:from-white dark:to-white/40 sm:text-6xl md:text-7xl lg:text-8xl"
	>
		DBee Builder is the new way
		<br class="hidden md:block" />
		{' '}
		to build V2 Frames.
	</h1>
	<p
		class="mb-12 -translate-y-4 animate-fade-in text-balance text-lg tracking-tight text-gray-400 opacity-0 [--animation-delay:400ms] md:text-xl"
	>
		You are looking at the first frame built with
		<br class="hidden md:block" />
		{' '}
		Tailwind CSS, <a href="https://svelte.dev" class="underline underline-offset-2">Svelte</a>, and
		<a href="https://animation-svelte.vercel.app" class="underline underline-offset-2">Svelte Animations</a>.
	</p>

	{#if $wagmiLoaded}
		{#if $connected}
			<Button class="-translate-y-4 animate-fade-in gap-1 rounded-lg text-white opacity-0 ease-in-out [--animation-delay:600ms] dark:text-black" href="/dashboard">Go to Dashboard</Button>
		{:else}
			<Button class="-translate-y-4 animate-fade-in gap-1 rounded-lg text-white opacity-0 ease-in-out [--animation-delay:600ms] dark:text-black" on:click={openModal}>Connect Wallet</Button>
		{/if}
	{/if}
</section>
