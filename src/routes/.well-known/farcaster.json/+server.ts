import { json } from '@sveltejs/kit';

export const prerender = true; // Allows static generation for production (optional)

export const GET = async () => {
    const appUrl = import.meta.env.VITE_PUBLIC_URL || 'http://localhost:5173';

    const config = {
        accountAssociation: {
            header:
                "eyJmaWQiOjQyMjMzMywidHlwZSI6ImN1c3RvZHkiLCJrZXkiOiIweDY2N0Q2ZGMzOEUwMjJlNjcwNzFFNzE4OUZGNDUxM2VkNTg5MzkzMjAifQ",
            payload: "eyJkb21haW4iOiJidWlsZGVyLmRiZWUuYmUifQ",
            signature:
                "MHg2NDZiODc5MTFlMzdhYmNhOWUxYzk2OWQ3NTJlMGMxM2M4ODc1ZjY2ZmI4OWQ3ZjJmYzVjYzY2YzZlODlhMDEzMDU3ODY1ZjUwZjM1NTMxNjk5NjJlZTk4MjIwMjZmYjc1M2IxZjNhZGY5YTEzYzgzOGNiMTNmNDJkZmZkM2VlOTFi",
        },
        frame: {
            version: "1",
            name: "DBee Builder",
            iconUrl: `${appUrl}/icon.png`,
            homeUrl: appUrl,
            imageUrl: `${appUrl}/opengraph.png`,
            buttonTitle: "Build your frame",
            splashImageUrl: `${appUrl}/splash.png`,
            splashBackgroundColor: "#000000",
            webhookUrl: `${appUrl}/api/webhook`,
        },
    };

    return json(config, {
        headers: {
            'Content-Type': 'application/json',
        },
    });
};
