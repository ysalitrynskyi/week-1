<script lang="ts">
  import '../app.css';
  import { ModeWatcher } from 'mode-watcher';
  import { PrivyProvider } from "@privy-io/react-auth";
  import { used } from "svelte-preprocess-react";
  import { base } from "viem/chains";
  import { onMount } from 'svelte';

  used(PrivyProvider);

  let appId = import.meta.env.VITE_PUBLIC_PRIVY_APP_ID;
  let isLoaded = false;

  onMount(() => {
    if (!appId) {
      console.error("Privy app ID is missing.");
    }
    // Simulate initialization delay
    setTimeout(() => {
      isLoaded = true;
    }, 1000); // Adjust delay as needed
  });
</script>

<ModeWatcher />

{#if isLoaded}
  <react:PrivyProvider
    appId={appId}
    config={{
      defaultChain: base,
      supportedChains: [base],
      loginMethods: ["wallet"],
    }}
  >
    <slot />
  </react:PrivyProvider>
{:else}
  <div class="loader"></div>
{/if}

<style>
  /* HTML: <div class="loader"></div> */
  .loader {
    width: 45px;
    height: 30px;
    animation: l1 2s infinite linear;

    /* Centering loader */
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute; /* Use absolute positioning */
    top: 50%; /* Move to the vertical center */
    left: 50%; /* Move to the horizontal center */
    transform: translate(-50%, -50%); /* Adjust for size */
    font-size: 1.5rem;
  }
  @keyframes l1{
    0%,
    25%  {background:
      linear-gradient(#e50021 0 0) 50% 0/66% 100% no-repeat}
    25.1%,
    50%  {background:
      linear-gradient(#004ce4 0 0) 0 0/100% 50% no-repeat,
      linear-gradient(#004ce4 0 0) 0 0/33% 100% no-repeat}
    50.1%,
    75%  {background:
      linear-gradient(#00e622 0 0) 100% 0/66% 50% no-repeat,
      linear-gradient(#00e622 0 0) 0 100%/66% 50% no-repeat}
    75.1%,
    100% {background:
      linear-gradient(#9d0be6 0 0) 0 100%/100% 50% no-repeat,
      linear-gradient(#9d0be6 0 0) 50% 0 /33%  50% no-repeat}
  }
</style>
