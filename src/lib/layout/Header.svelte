<script lang="ts">
	import { browser } from '$app/environment';
	import Button from '$lib/components/ui/button/button.svelte';
	import { hooks } from "svelte-preprocess-react";
	import { usePrivy, useWallets } from "@privy-io/react-auth";

	const privyStore = hooks(() => usePrivy());
	const privyWalletsStore = hooks(() => useWallets());

	let innerWidth = 0;

	function hasSession(): boolean {
		if (!browser) return false;
		const cookies = document.cookie.split(';');
		return cookies.some((c) => c.trim().startsWith('session_token='));
	}

	$: if ($privyStore && $privyStore.authenticated && $privyWalletsStore && $privyWalletsStore.wallets.length) {
		const address = $privyWalletsStore.wallets[0].address;
		if (address && !hasSession()) {
			handleSession(address);
		}
	}

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

<header class="fixed left-0 top-0 z-50 w-full -translate-y-4 animate-fade-in border-b opacity-0 backdrop-blur-md">
	<div class="container flex h-14 items-center justify-between">
		<a class="text-md flex items-center" href="/">DBee Builder</a>

		<div class="ml-auto flex h-full items-center">
			{#if $privyStore?.ready}
				{#if $privyStore.authenticated && $privyWalletsStore?.wallets?.length > 0}
					<Button class="mr-2 text-sm" href="/dashboard" rel="external">
						Dashboard
					</Button>
					<Button variant="secondary" class="lg:mr-6 text-sm" on:click={logout}>
						Disconnect
					</Button>
				{:else}
					<Button class="lg:mr-6 text-sm" on:click={() => {
						if (!$privyStore.authenticated) {
							$privyStore.login();
						} else {
							$privyStore.connectWallet();
						}
					}}>
						Sign In
					</Button>
				{/if}
			{:else}
<!--				<Button variant="secondary" class="lg:mr-6 text-sm" disabled>Sign In</Button>-->
			{/if}
		</div>
	</div>
</header>
