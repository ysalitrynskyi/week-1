<script>
    export let data;
    import Button from '$lib/components/ui/button/button.svelte';
</script>

<div class="mx-auto mt-24 max-w-7xl px-6 md:px-8">
    <div class="flex flex-col items-stretch gap-8 py-12 md:flex-row md:items-start">
        <!-- User Info -->
        <div class="flex w-full flex-col gap-4 rounded-xl bg-card p-8 shadow-xl md:w-1/3">
            <h2 class="text-2xl font-bold text-primary">User Information</h2>

            {#if data.userAddress}
                {#if data.farcasterUser}
                    <div class="mt-4 flex items-center gap-4">
                        {#if data.farcasterUser.pfp_url}
                            <img src={data.farcasterUser.pfp_url} alt="Avatar" class="h-16 w-16 rounded-full"/>
                        {:else}
                            <div class="h-16 w-16 rounded-full bg-gray-300"/>
                        {/if}
                        <div>
                            <p class="text-lg font-semibold text-foreground">
                                {data.farcasterUser.display_name || data.farcasterUser.username || 'Unknown User'}
                            </p>
                            {#if data.farcasterUser.username}
                                <p class="text-sm text-muted-foreground">@{data.farcasterUser.username}</p>
                            {/if}
                        </div>
                    </div>

                    <div class="mt-4">
                        <p class="text-md text-muted-foreground">Following / Followers:</p>
                        <p class="mt-1 break-all font-mono text-xs text-blue-700 dark:text-blue-400">
                            {data.farcasterUser.following_count} / {data.farcasterUser.follower_count}
                        </p>
                    </div>
                    <div class="">
                        <p class="text-md text-muted-foreground">Bio:</p>
                        <p class="mt-1 break-all font-mono text-xs text-blue-700 dark:text-blue-400">
                            {data.farcasterUser.profile.bio.text}
                        </p>
                    </div>
                    <div class="">
                        <p class="text-md text-muted-foreground">Custody Address:</p>
                        <p class="mt-1 break-all font-mono text-xs text-blue-700 dark:text-blue-400">
                            {data.farcasterUser.custody_address}
                        </p>
                    </div>
                    <div class="">
                        <p class="text-md text-muted-foreground">Wallet Address:</p>
                        <p class="mt-1 break-all font-mono text-xs text-blue-700 dark:text-blue-400">
                            {data.userAddress}
                        </p>
                    </div>
                {:else}
                    <p class="mt-4 text-sm text-muted-foreground">
                        No Farcaster user data found for this wallet.
                    </p>
                {/if}
            {:else}
                <p class="mt-2 text-sm text-muted-foreground">
                    No wallet connected.
                </p>
            {/if}
        </div>

        <!-- Actions Section -->
        <div class="flex-1 flex flex-col gap-8">
            <div class="rounded-xl bg-white p-8 shadow-xl dark:bg-background/50 dark:shadow-none">
                <h1 class="text-3xl font-extrabold text-primary">Create & Convert Frames</h1>
                <p class="mt-4 text-lg leading-relaxed text-foreground/80 dark:text-foreground/60">
                    Seamlessly convert any website into a Farcaster-compatible frame, or
                    design your own personal frame in just a few clicks.
                </p>
                <div class="mt-6 flex flex-col gap-4 sm:flex-row">
                    <Button variant="secondary" size="lg" on:click={() => alert('Convert feature coming soon!')}>
                        Convert Any Website
                    </Button>
                    <Button variant="secondary" size="lg" on:click={() => alert('Create frame coming soon!')}>
                        Create Personal Frame
                    </Button>
                </div>
            </div>
        </div>
    </div>
</div>
