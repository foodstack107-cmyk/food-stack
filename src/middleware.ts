import { withAuth } from 'next-auth/middleware';

export default withAuth({
  callbacks: {
    authorized({ token, req }) {
      const { pathname } = req.nextUrl;
      // Admin routes require Admin role
      if (pathname.startsWith('/admin')) {
        return token?.role === 'Admin';
      }
      return !!token;
    },
  },
  pages: {
    signIn: '/login',
  },
});

export const config = { matcher: ['/admin/:path*', '/profile'] };
