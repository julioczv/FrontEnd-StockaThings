import { cookies } from 'next/headers';

export async function getAuthToken() {
    const jar = await cookies();
    return jar.get('auth')?.value ?? null;
}