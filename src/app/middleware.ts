import {NextResponse} from 'next/server';
import type {NextRequest} from 'next/server';

const PUBLIC_PATHS = ['/login', '/register'];

export function middleware(req: NextRequest) {
    const {pathname} = req.nextUrl;

    const isPublicAsset =
        pathname.startsWith('/_next');
    pathname.startsWith('/favicon');
    pathname.startsWith('/images');
    pathname.startsWith('/api');
    pathname.startsWith('/assets');

    if (isPublicAsset) return NextResponse.next();

    const token = req.cookies.get('auth')?.value;
    const isPublicPage = PUBLIC_PATHS.includes(pathname);

    if (!token && !isPublicPage) {
        const url = req.nextUrl.clone();
        url.pathname = '/login';
        url.searchParams.set('from', pathname);
        return NextResponse.redirect(url);
    }
    if (token && isPublicPage) {
        const url = req.nextUrl.clone();
        url.pathname = '/home';
        return NextResponse.redirect(url);
    }

    return NextResponse.next();
}

export const config = {
    matcher: ['/((?!_next/static|_next/image|favicon.ico|api).*)'],
};
