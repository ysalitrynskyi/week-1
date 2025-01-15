<script lang="ts">
  import {
    connected,
    wagmiLoaded,
    web3Modal,
    disconnectWagmi,
    signerAddress
  } from 'svelte-wagmi';
  import { browser } from '$app/environment';
  import { goto } from '$app/navigation'; // Import SvelteKit's goto
  import Button from '$lib/components/ui/button/button.svelte';

  let innerWidth = 0;

  function hasSession(): boolean {
    if (!browser) return false;
    const cookies = document.cookie.split(';');
    return cookies.some((cookie) => cookie.trim().startsWith('session_token='));
  }

  function openModal() {
    $web3Modal.open();
  }

  $: if ($connected && $signerAddress) {
    void handleSession($signerAddress);
  }
  async function handleSession(address: string) {
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
    if ($connected) {
      await disconnectWagmi();
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
    <!-- Branding/Logo linking to home -->
    <a class="text-md flex items-center" href="/">DBee Builder</a>

    <div class="ml-auto flex h-full items-center">
      {#if $wagmiLoaded}
        {#if $connected || hasSession()}
          <Button class="mr-2 text-sm" href="/dashboard" rel="external">
            Dashboard
          </Button>
          <Button variant="secondary" class="lg:mr-6 text-sm" on:click={disconnect}>
            Disconnect
          </Button>
        {:else}
          <Button class="lg:mr-6 text-sm" on:click={openModal}>Connect Wallet</Button>
        {/if}
      {:else}
        <Button variant="secondary" class="lg:mr-6 text-sm" disabled>Connect Wallet</Button>
      {/if}
    </div>
  </div>
</header>
