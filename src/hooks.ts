import type { Handle } from '@sveltejs/kit';

export const handle: Handle = async ({ event, resolve }) => {
    if (event.url.pathname.startsWith('/.well-known')) {
        const url = new URL(event.url);
        url.pathname = url.pathname.replace('/.well-known', '/well-known');

        const res = await fetch(url.href, {
            method: event.request.method,
            headers: event.request.headers,
        });

        // Safely handle potentially null headers
        const headers = new Headers();
        const contentType = res.headers.get('content-type') ?? 'application/json'; // Default to JSON
        const cacheControl = res.headers.get('cache-control') ?? 'no-cache'; // Default to no-cache

        headers.set('content-type', contentType);
        headers.set('cache-control', cacheControl);

        return new Response(await res.text(), { headers });
    }

    return resolve(event);
};
