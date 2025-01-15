<script>
    import { signerAddress } from 'svelte-wagmi';
</script>

<h1>Welcome to the Dashboard</h1>
<p>Your connected wallet address: {$signerAddress}</p>
