<script lang="ts">
	import {connected, wagmiLoaded, web3Modal, disconnectWagmi} from 'svelte-wagmi';
	import Button from '$lib/components/ui/button/button.svelte';

	let innerWidth = 0;

	function openModal() {
		$web3Modal.open();
	}

	async function disconnect() {
		await disconnectWagmi();
	}
</script>

<svelte:window bind:innerWidth />
<header
	class="fixed left-0 top-0 z-50 w-full -translate-y-4 animate-fade-in border-b opacity-0 backdrop-blur-md"
>
	<!-- {#if innerWidth < 768} -->
		<div class="container flex h-14 items-center justify-between">
			<a class="text-md flex items-center" href="/"> DBee Builder </a>

			<div class="ml-auto flex h-full items-center">
				{#if $wagmiLoaded}
					{#if $connected}
						<Button class="mr-2 text-sm" href="/dashboard">Dashboard</Button>
						<Button variant="secondary" class="mr-6 text-sm" on:click={disconnect}>Disconnect</Button>
					{:else}
						<Button class="mr-6 text-sm" on:click={openModal}>Connect Wallet</Button>
					{/if}
				{/if}
			</div>
		</div>
	<!-- {/if} -->
</header>
