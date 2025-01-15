import { supabase } from '$lib/supabase';
import { json, type RequestHandler } from '@sveltejs/kit';
import { randomBytes } from 'crypto';

export const POST: RequestHandler = async ({ request, cookies }) => {
	try {
		const { address } = await request.json();
		if (!address) {
			return json({ error: 'No address provided' }, { status: 400 });
		}

		const { error: supabaseError } = await supabase
			.from('users')
			.upsert({ address }, { onConflict: 'address'});

		if (supabaseError) {
			return json({ error: supabaseError.message }, { status: 500 });
		}

		const token = randomBytes(16).toString('hex');

		const { error: sessionError } = await supabase
			.from('sessions')
			.insert({ token, address });

		if (sessionError) {
			return json({ error: sessionError.message }, { status: 500 });
		}

		cookies.set('session_token', token, {
			path: '/',
			httpOnly: true,
			sameSite: 'strict',
			secure: true,
			maxAge: 60 * 60 * 24 * 7
		});

		return json({ success: true });
	} catch (err: any) {
		return json({ error: err.message }, { status: 500 });
	}
};

export const DELETE: RequestHandler = async ({ cookies }) => {
	const token = cookies.get('session_token');
	if (token) {
		await supabase
			.from('sessions')
			.delete()
			.eq('token', token);

		cookies.delete('session_token', {
			path: '/'
		});
	}

	return json({ success: true });
};
