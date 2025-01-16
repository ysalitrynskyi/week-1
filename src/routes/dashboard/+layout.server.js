import { error, redirect } from '@sveltejs/kit';

const NEYNAR_API_KEY = import.meta.env.VITE_NEYNAR_API_KEY;

export const load = async ({ locals, fetch, cookies }) => {
	try {
		const sessionToken = cookies.get('session_token');
		if (!locals.userAddress || !sessionToken) {
			console.error("Missing user address or session token");
			throw redirect(302, '/');
		}

		const ethAddress = locals.userAddress;
		if (!ethAddress) {
			console.error("Missing Ethereum address");
			throw error(400, 'Ethereum address is required');
		}

		if (!NEYNAR_API_KEY) {
			console.error("Missing NEYNAR_API_KEY environment variable");
			throw error(500, 'Missing NEYNAR_API_KEY environment variable');
		}

		const apiUrl = `https://api.neynar.com/v2/farcaster/user/bulk-by-address?addresses=${ethAddress}`;
		const response = await fetch(apiUrl, {
			method: 'GET',
			headers: {
				accept: 'application/json',
				'x-api-key': NEYNAR_API_KEY,
			},
		});

		if (!response.ok) {
			console.error(`Neynar API Error: ${response.statusText}`);
			throw error(response.status, `Neynar API Error: ${response.statusText}`);
		}

		const data = await response.json();
		const userData = data[ethAddress.toLowerCase()]?.[0] || null;

		return {
			userAddress: ethAddress,
			farcasterUser: userData,
		};
	} catch (err) {
		console.error("Error in +layout.server.js load function:", err);
		throw error(500, 'Failed to load data');
	}
};
