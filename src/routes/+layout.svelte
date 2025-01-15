<script>
    import '../app.css';
    import { ModeWatcher } from 'mode-watcher';
    import { onMount } from 'svelte';
    import { defaultConfig } from 'svelte-wagmi';
    import { injected, walletConnect, coinbaseWallet } from '@wagmi/connectors';

    // Example environment variables (SvelteKit style):
    import { PUBLIC_WALLETCONNECT_ID, PUBLIC_ALCHEMY_ID } from '$env/static/public';

    let erckit;

    onMount(async () => {
        // Call defaultConfig with any options you want:
        erckit = defaultConfig({
            appName: 'DBee Builder',
            walletConnectProjectId: PUBLIC_WALLETCONNECT_ID,
            alchemyId: PUBLIC_ALCHEMY_ID,
            connectors: [
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
