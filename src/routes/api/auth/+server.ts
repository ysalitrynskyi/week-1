import { supabase } from '$lib/supabase';
import { json, type RequestHandler } from '@sveltejs/kit';
import { randomBytes } from 'crypto';

// === POST /api/auth ===
// Upsert user address -> create a session token -> set cookie
export const POST: RequestHandler = async ({ request, cookies }) => {
	try {
		const { address } = await request.json();
		if (!address) {
			return json({ error: 'No address provided' }, { status: 400 });
		}

		// 1) Upsert the user in `users` table
		const { error: supabaseError } = await supabase
			.from('users')
			.upsert({ address }, { onConflict: 'address'});

		if (supabaseError) {
			return json({ error: supabaseError.message }, { status: 500 });
		}

		// 2) Generate random token (session id)
		const token = randomBytes(16).toString('hex');

		// 3) Insert into `sessions` table
		const { error: sessionError } = await supabase
			.from('sessions')
			.insert({ token, address });

		if (sessionError) {
			return json({ error: sessionError.message }, { status: 500 });
		}

		// 4) Set cookie with session token
		cookies.set('session_token', token, {
			path: '/',
			httpOnly: true,
			sameSite: 'strict',
			secure: true, // set true in production w/ HTTPS
			maxAge: 60 * 60 * 24 * 7 // one week
		});

		return json({ success: true });
	} catch (err: any) {
		return json({ error: err.message }, { status: 500 });
	}
};

// === DELETE /api/auth ===
// Invalidate session token (logout)
export const DELETE: RequestHandler = async ({ cookies }) => {
	const token = cookies.get('session_token');
	if (token) {
		// Remove from DB
		await supabase
			.from('sessions')
			.delete()
			.eq('token', token);

		// Clear cookie
		cookies.delete('session_token', {
			path: '/'
		});
	}

	return json({ success: true });
};
