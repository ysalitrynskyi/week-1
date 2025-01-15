<script>
    export let data;
</script>

<slot />

<p class="p-4 text-sm text-gray-500">
    Logged in as {data.userAddress}
</p>
