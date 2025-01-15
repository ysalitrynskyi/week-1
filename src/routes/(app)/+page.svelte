<script>
	import { seo } from '$lib';
	import CtaSection from '$lib/components/landing/CtaSection.svelte';
	import HeroSection from '$lib/components/landing/HeroSection.svelte';

	const appUrl = import.meta.env.VITE_PUBLIC_URL || 'http://localhost:5173';
	const frame = {
		version: "next",
		imageUrl: `${appUrl}/opengraph.png`,
		button: {
			title: "Launch DBee Builder",
			action: {
				type: "launch_frame",
				name: "DBee Builder",
				url: appUrl,
				splashImageUrl: `${appUrl}/splash.png`,
				splashBackgroundColor: "black",
			},
		},
	};
</script>

<svelte:head>
	<title>{seo.title}</title>
	<meta name="description" content={seo.description} />
	<meta name="keywords" content={seo.keywords} />

	<meta property="og:title" content={seo.title} />
	<meta property="og:description" content={seo.description} />
	<meta property="og:image" content={seo.image} />
	<meta property="og:site_name" content={seo.title} />
	<meta property="og:url" content={seo.url} />

	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:title" content={seo.title} />
	<meta name="twitter:description" content={seo.description} />
	<meta name="twitter:image" content={seo.image} />
	<meta name="twitter:site" content="@Sikandar_Bhide" />

<!--	<meta name="fc:frame" content="{JSON.stringify(frame)}" />-->
</svelte:head>
<HeroSection />
<CtaSection />