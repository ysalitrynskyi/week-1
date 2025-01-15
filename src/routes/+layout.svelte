<script lang="ts">
  export const ssr = false;
  import '../app.css';
  import { ModeWatcher } from 'mode-watcher';
  import { PrivyProvider } from "@privy-io/react-auth";
  import { used } from "svelte-preprocess-react";
  import { base } from "viem/chains";

  used(PrivyProvider);

  let appId = import.meta.env.VITE_PUBLIC_PRIVY_APP_ID;
</script>

<ModeWatcher />

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
