import type { Handle } from '@sveltejs/kit';
import { supabase } from '$lib/supabase';

export const handle: Handle = async ({ event, resolve }) => {
	const token = event.cookies.get('session_token');
	if (token) {
		const { data, error } = await supabase
			.from('sessions')
			.select('address')
			.eq('token', token)
			.single();

		if (!error && data?.address) {
			event.locals.userAddress = data.address;
		}
	}
	return resolve(event);
};
