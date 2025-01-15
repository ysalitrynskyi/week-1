// src/routes/dashboard/+layout.server.ts
import {error, redirect} from '@sveltejs/kit';

const NEYNAR_API_KEY = import.meta.env.VITE_NEYNAR_API_KEY;

export const load = async ({ locals, fetch }) => {
    // If the user has no address in locals, they're not logged in.
    if (!locals.userAddress) {
        throw redirect(302, '/');
    }

    const ethAddress = locals.userAddress;

    // Validate the Ethereum address
    if (!ethAddress) {
        throw error(400, 'Ethereum address is required');
    }

    // Ensure the API key is available
    if (!NEYNAR_API_KEY) {
        throw error(500, 'Missing NEYNAR_API_KEY environment variable');
    }

    try {
        // Construct the API URL with the user's Ethereum address
        const apiUrl = `https://api.neynar.com/v2/farcaster/user/bulk-by-address?addresses=${ethAddress}`;

        // Send the request to Neynar API
        const response = await fetch(apiUrl, {
            method: 'GET',
            headers: {
                accept: 'application/json',
                'x-api-key': NEYNAR_API_KEY
            }
        });

        // Handle non-successful responses
        if (!response.ok) {
            throw error(response.status, `Neynar API Error: ${response.statusText}`);
        }

        // Parse the response JSON
        const data = await response.json();

        // Extract user data from the response
        const userData = data[ethAddress.toLowerCase()][0] || null;

        // Return the user's Ethereum address and Farcaster user data
        return {
            userAddress: ethAddress,
            farcasterUser: userData
        };
    } catch (err) {
        console.error('Error fetching user data:', err);
        throw error(500, 'Failed to fetch user data');
    }
};
