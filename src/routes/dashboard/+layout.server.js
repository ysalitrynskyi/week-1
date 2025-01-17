import { redirect, error } from '@sveltejs/kit';

// Load the NEYNAR API key from environment variables
const NEYNAR_API_KEY = import.meta.env.VITE_NEYNAR_API_KEY;

export const load = async ({ locals, fetch, cookies }) => {
	// Validate the NEYNAR API key
	if (!NEYNAR_API_KEY) {
		console.error("Environment variable NEYNAR_API_KEY is missing or undefined.");
		throw error(500, 'Server misconfiguration: Missing NEYNAR_API_KEY');
	}

	// Retrieve the session token from cookies
	const sessionToken = cookies.get('session_token');
	if (!sessionToken) {
		console.warn("Session token is missing. Redirecting to '/'...");
		throw redirect(302, '/');
	}

	// Validate the Ethereum address in locals
	const ethAddress = locals.userAddress;
	if (!ethAddress) {
		console.warn("Ethereum address is missing in locals. Redirecting to '/'...");
		throw redirect(302, '/');
	}

	try {
		// Construct Neynar API URL with encoded Ethereum address
		const apiUrl = `https://api.neynar.com/v2/farcaster/user/bulk-by-address?addresses=${encodeURIComponent(
			ethAddress
		)}`;

		// Fetch data from the Neynar API
		const response = await fetch(apiUrl, {
			method: 'GET',
			headers: {
				accept: 'application/json',
				'x-api-key': NEYNAR_API_KEY,
			},
		});

		// Check for non-OK HTTP responses
		if (!response.ok) {
			console.error(`Neynar API request failed: ${response.status} - ${response.statusText}`);
			throw error(response.status, `Neynar API error: ${response.statusText}`);
		}

		// Parse the JSON response
		const data = await response.json();

		// Extract user data by Ethereum address (case-insensitive match)
		const userData = data[ethAddress.toLowerCase()]?.[0] || null;

		// Warn if no user data is found
		if (!userData) {
			console.warn(`No user data found for Ethereum address: ${ethAddress}`);
		}

		// Return the fetched data
		return {
			userAddress: ethAddress,
			farcasterUser: userData,
		};
	} catch (err) {
		// Log errors and rethrow with a generic message
		console.error("Error during Neynar API request or processing:", err);
		throw error(500, 'Failed to load user data. Please try again later.');
	}
};
