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
    width: 50px;
    aspect-ratio: 1;
    box-shadow: 0 0 0 3px #fff inset;
    border-radius: 50%;

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
  .loader:before,
  .loader:after {
    content: "";
    position: absolute;
    top: 5px;
    left: calc(50% - 12.5px);
    box-shadow: inherit;
    width: 25px;
    aspect-ratio: 1;
    border-radius: 50%;
    transform-origin: 50% calc(100% - 5px);
    animation: l7 1.5s linear infinite;
  }
  .loader:after {
    top: calc(100% + 2px);
    transform-origin: 50% -27px;
    animation-delay: -0.75s;
  }
  @keyframes l7 {
    to {
      transform: rotate(360deg);
    }
  }
</style>
