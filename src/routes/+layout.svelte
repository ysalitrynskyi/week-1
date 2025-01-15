<script>
    export const ssr = false;

    import '../app.css';
    import {ModeWatcher} from 'mode-watcher';
    import {onMount} from 'svelte';
    import {defaultConfig} from 'svelte-wagmi';
    import {injected, walletConnect, coinbaseWallet} from '@wagmi/connectors';
    import {base} from "viem/chains";

    // Example environment variables (SvelteKit style):
    import {PUBLIC_WALLETCONNECT_ID} from '$env/static/public';
    import {farcasterConnector} from "$lib/farcasterConnector";

    let erckit;

    onMount(async () => {
        // Call defaultConfig with any options you want:
        erckit = defaultConfig({
            appName: 'DBee Builder',
            walletConnectProjectId: PUBLIC_WALLETCONNECT_ID,
            chains: [base],
            autoConnect: true,
            connectors: [
                farcasterConnector(),
                injected(),
                coinbaseWallet({
                    appName: 'DBee Builder',
                    appLogoUrl: 'https://builder.dbee.be/logo.png',
                }),
                walletConnect({   // walletConnect connector
                    projectId: PUBLIC_WALLETCONNECT_ID,
                }),
            ]
        });

        // Initialize the configuration:
        await erckit.init();
    });
</script>

<ModeWatcher />
<slot></slot>
