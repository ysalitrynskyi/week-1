// src/routes/dashboard/+layout.server.ts
import { redirect } from '@sveltejs/kit';

export const load = async ({ locals }) => {
    // If the user has no address in locals, they're not logged in.
    if (!locals.userAddress) {
        throw redirect(302, '/');
    }
    return { userAddress: locals.userAddress };
};
