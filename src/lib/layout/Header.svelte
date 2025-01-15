<script lang="ts">
	import {
		connected,
		wagmiLoaded,
		web3Modal,
		disconnectWagmi,
		signerAddress
	} from 'svelte-wagmi';
	import Button from '$lib/components/ui/button/button.svelte';

	let innerWidth = 0;

	function openModal() {
		$web3Modal.open();
	}

	// Check if session_token is present in cookies
	function hasSession() {
		const cookies = document.cookie.split(';');
		return cookies.some(cookie => cookie.trim().startsWith('session_token='));
	}

	// Watch for changes. If just connected, and no session exists, call /api/auth.
	$: if ($connected && $signerAddress) {
		void handleSession($signerAddress);
	}

	async function handleSession(address: string) {
		// Only send the request if no session exists
		if (hasSession()) {
			console.log('Session already exists. Skipping /api/auth request.');
			return;
		}

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

	async function disconnect() {
		// 1) Disconnect from Wagmi (if connected)
		if ($connected) {
			await disconnectWagmi();
		}

		// 2) Call DELETE to remove session (even if Wagmi is disconnected)
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

		// 3) Reload to reflect logged-out state
		location.reload();
	}
</script>

<svelte:window bind:innerWidth />
<header
	class="fixed left-0 top-0 z-50 w-full -translate-y-4 animate-fade-in border-b opacity-0 backdrop-blur-md"
>
	<div class="container flex h-14 items-center justify-between">
		<a class="text-md flex items-center" href="/"> DBee Builder </a>

		<div class="ml-auto flex h-full items-center">
			{#if $wagmiLoaded}
				{#if $connected || hasSession()}
					<Button class="mr-2 text-sm" href="/dashboard">Dashboard</Button>
					<Button variant="secondary" class="lg:mr-6 text-sm" on:click={disconnect}>Disconnect</Button>
				{:else}
					<Button class="lg:mr-6 text-sm" on:click={openModal}>Connect Wallet</Button>
				{/if}
			{:else}
				<Button variant="secondary" class="lg:mr-6 text-sm" disabled>Connect Wallet</Button>
			{/if}
		</div>
	</div>
</header>
