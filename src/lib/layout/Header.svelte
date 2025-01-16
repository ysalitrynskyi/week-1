<script lang="ts">
	import { browser } from '$app/environment';
	import Button from '$lib/components/ui/button/button.svelte';
	import { hooks } from "svelte-preprocess-react";
	import { usePrivy, useWallets } from "@privy-io/react-auth";

	const privyStore = hooks(() => usePrivy());
	const privyWalletsStore = hooks(() => useWallets());

	let innerWidth = 0;

	// Check if session exists in cookies
	function hasSession(): boolean {
		if (!browser) return false;
		const cookies = document.cookie.split(';');
		return cookies.some((c) => c.trim().startsWith('session_token='));
	}

	// Modified session handling logic
	$: if ($privyStore?.ready) {
		if ($privyStore?.authenticated && $privyWalletsStore?.wallets?.length) {
			const address = $privyWalletsStore.wallets[0].address;
			// Only create session if we have an address and no existing session
			if (address && !hasSession()) {
				handleSession(address);
			}
		}
	}

	// Send session creation request to the server
	async function handleSession(address: string) {
		try {
			const res = await fetch('/api/auth', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ address })
			});
			if (!res.ok) {
				console.error('POST /api/auth error', await res.json());
			}
		} catch (err) {
			console.error('Auth error', err);
		}
	}

	// Logout function to remove session
	async function logout() {
		if ($privyStore) {
			$privyStore.logout();
		}
		try {
			const res = await fetch('/api/auth', {
				method: 'DELETE'
			});
			if (!res.ok) {
				console.error('DELETE /api/auth error', await res.json());
			}
		} catch (err) {
			console.error('Error during logout:', err);
		}
		location.reload();
	}
</script>

<svelte:window bind:innerWidth />

<header class="fixed left-0 top-0 z-50 w-full border-b backdrop-blur-md">
	<div class="container flex h-14 items-center justify-between">
		<a class="text-md flex items-center" href="/">DBee Builder</a>

		<div class="ml-auto flex h-full items-center">
			{#if $privyStore?.authenticated}
				<Button class="mr-2 text-sm" href="/dashboard" rel="external">
					Dashboard
				</Button>
				<Button variant="secondary" class="lg:mr-6 text-sm" on:click={logout}>
					Disconnect
				</Button>
			{:else}
				{#if $privyWalletsStore?.wallets}
					<Button class="lg:mr-6 text-sm" on:click={() => {
							$privyStore?.connectWallet();
					}}>
						Sign In
					</Button>
				{:else}
					<span class="text-sm text-gray-500">Loading...</span>
				{/if}
			{/if}
		</div>
	</div>
</header>
