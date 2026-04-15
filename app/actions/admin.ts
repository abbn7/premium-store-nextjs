'use server';

import { cookies } from 'next/headers';
import { createServerSupabaseClient } from '@/lib/supabase-server';

export async function adminLogin(password: string) {
  // In a real production app, we would use Supabase Auth email/password.
  // For this premium project, we are using a simplified secure master password approach
  // managed by an environment variable for ease of demo/setup.

  const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'admin123';

  if (password === ADMIN_PASSWORD) {
    // Set a secure httpOnly cookie
    cookies().set('admin_session', 'true', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 60 * 60 * 24 * 7, // 1 week
    });
    return { success: true };
  }

  return { success: false, error: 'Invalid admin credentials' };
}

export async function adminLogout() {
  cookies().delete('admin_session');
  return { success: true };
}

export async function isAdmin() {
  const cookieStore = cookies();
  return cookieStore.get('admin_session')?.value === 'true';
}
