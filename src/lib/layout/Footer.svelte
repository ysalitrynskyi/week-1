<script>
	import WarpcastSvg from '$lib/imgs/warpcast.svg';
	import GitHubSvg from '$lib/imgs/GitHub.svg';

	const footerSocials = [
		{
			href: 'https://warpcast.com/~/channel/dbee',
			name: 'Warpcast',
			icon: WarpcastSvg
		},
		{
			href: 'https://github.com/ysalitrynskyi/week-1',
			name: 'GitHub',
			icon: GitHubSvg
		}
	];
</script>

<footer class="mb-5">
	<div class="mx-auto w-full max-w-screen-xl xl:pb-2">
		<div
			class="flex flex-col items-center gap-6 px-8 py-4 lg:flex-row lg:items-center lg:justify-between text-center"
		>
			<div class="flex space-x-5">
				{#each footerSocials as social}
					<a
						href={social.href}
						target="_blank"
						class="fill-gray-500 text-gray-500 hover:fill-gray-900 hover:text-gray-900 dark:hover:fill-gray-600 dark:hover:text-gray-600"
					>
						<img src={social.icon} class="size-4" alt={social.name} />
						<span class="sr-only">{social.name}</span>
					</a>
				{/each}
			</div>
			<span class="text-sm text-gray-500 dark:text-gray-400">
				Copyright ©
				{' '}
				{new Date().getFullYear()}
				{' '}
				<a href="https://warpcast.com/dalresin" target="_blank" class="cursor-pointer">Lord Dalresin</a>. <br class="lg:hidden" />
				Free for personal and commercial use.
			</span>
		</div>
	</div>
</footer>
