// src/lib/farcasterConnector.ts
// import { createConnector, ChainNotConfiguredError } from 'svelte-wagmi/node_modules/wagmi';
import { createConnector, ChainNotConfiguredError } from 'wagmi';
import { fromHex, getAddress, numberToHex, SwitchChainError } from 'viem';

/**
 * Wait up to a few seconds for window.fcsdk to exist, checking every 50ms.
 */
async function waitForFcsdk(): Promise<void> {
  if (typeof window === 'undefined') return; // SSR guard
  if (window.fcsdk?.wallet?.ethProvider) return;

  let elapsed = 0;
  await new Promise<void>((resolve, reject) => {
    const interval = setInterval(() => {
      if (window.fcsdk?.wallet?.ethProvider) {
        clearInterval(interval);
        resolve();
      } else {
        elapsed += 50;
        if (elapsed >= 3000) {
          clearInterval(interval);
          reject(new Error('Timed out waiting for window.fcsdk'));
        }
      }
    }, 50);
  });
}

export function farcasterConnector() {
  // Local references to event handlers to avoid multiple registrations
  let accountsChanged: ((accounts: readonly string[]) => void) | undefined;
  let chainChanged: ((chainId: string) => void) | undefined;
  let disconnect: (() => void) | undefined;

  return createConnector<typeof window.fcsdk.wallet.ethProvider>((config) => ({
    id: 'farcaster',
    name: 'Farcaster Wallet',
    type: 'farcaster',

    async connect({ chainId } = {}) {
      // Wait for the Farcaster wallet to be defined
      await waitForFcsdk();
      const provider = await this.getProvider();

      // Request accounts. If the user is already connected, the provider may just return them.
      const accounts = await provider.request({ method: 'eth_requestAccounts' });

      // Set up event listeners if not yet set
      if (!accountsChanged) {
        accountsChanged = this.onAccountsChanged.bind(this);
        provider.on('accountsChanged', accountsChanged);
      }
      if (!chainChanged) {
        chainChanged = this.onChainChanged.bind(this);
        provider.on('chainChanged', chainChanged);
      }
      if (!disconnect) {
        disconnect = this.onDisconnect.bind(this);
        provider.on('disconnect', disconnect);
      }

      // Check if we need to switch chain
      let currentChainId = await this.getChainId();
      if (chainId && currentChainId !== chainId) {
        const chain = await this.switchChain!({ chainId });
        currentChainId = chain.id;
      }

      return {
        accounts: accounts.map((a) => getAddress(a)),
        chainId: currentChainId
      };
    },

    async disconnect() {
      const provider = await this.getProvider();
      // Remove event listeners
      if (accountsChanged) {
        provider.removeListener('accountsChanged', accountsChanged);
        accountsChanged = undefined;
      }
      if (chainChanged) {
        provider.removeListener('chainChanged', chainChanged);
        chainChanged = undefined;
      }
      if (disconnect) {
        provider.removeListener('disconnect', disconnect);
        disconnect = undefined;
      }
    },

    async getAccounts() {
      await waitForFcsdk();
      const provider = await this.getProvider();
      const accounts = await provider.request({ method: 'eth_accounts' });
      return accounts.map((a: string) => getAddress(a));
    },

    async getChainId() {
      await waitForFcsdk();
      const provider = await this.getProvider();
      const hexChainId = await provider.request({ method: 'eth_chainId' });
      return fromHex(hexChainId, 'number');
    },

    async isAuthorized() {
      try {
        const accounts = await this.getAccounts();
        return accounts.length > 0;
      } catch {
        return false;
      }
    },

    async switchChain({ chainId }) {
      const provider = await this.getProvider();
      const chain = config.chains.find((x) => x.id === chainId);
      if (!chain) {
        throw new SwitchChainError(new ChainNotConfiguredError());
      }

      await provider.request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId: numberToHex(chainId) }]
      });

      // Emit chain changed for wagmi
      config.emitter.emit('change', { chainId });
      return chain;
    },

    onAccountsChanged(accounts: readonly string[]) {
      if (accounts.length === 0) {
        this.onDisconnect();
      } else {
        config.emitter.emit('change', {
          accounts: accounts.map((a) => getAddress(a))
        });
      }
    },

    onChainChanged(chain: string | number) {
      const chainId = Number(chain);
      config.emitter.emit('change', { chainId });
    },

    async onDisconnect() {
      config.emitter.emit('disconnect');
    },

    async getProvider() {
      await waitForFcsdk();
      if (!window.fcsdk?.wallet?.ethProvider) {
        throw new Error('Farcaster wallet provider not found on window.fcsdk!');
      }
      return window.fcsdk.wallet.ethProvider;
    }
  }));
}
