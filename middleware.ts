
import type { NextRequest } from 'next/server';
import { runMiddlewares } from './middlewares';

// List of protected routes that require authentication
// const protectedRoutes = [
//   '/profile',
//   // Add more protected routes here
// ];

export async function middleware(request: NextRequest) {
//   const { pathname } = request.nextUrl;
//   const userToken = request.cookies.get('userToken')?.value;

//   // If trying to access a protected route without a token, redirect to login
//   if (protectedRoutes.some(route => pathname.startsWith(route))) {
//     if (!userToken) {
//       const loginUrl = new URL('/login', request.url);
//       loginUrl.searchParams.set('redirect', pathname);
//       return NextResponse.redirect(loginUrl);
//     }
//   }

//   // If user is logged in and tries to access auth pages, redirect to home
//   const authRoutes = ['/login', '/register'];
//   if (authRoutes.some(route => pathname.startsWith(route))) {
//     if (userToken) {
//       return NextResponse.redirect(new URL('/', request.url));
//     }
//   }

   return runMiddlewares(request);
}

export const config = {
  matcher: ["/dashboard/:path*","/profile/:path*"], // حدد المسارات
};
