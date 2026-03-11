// types/next-auth.d.ts or src/types/next-auth.d.ts
import { DefaultJWT, DefaultSession, DefaultUser } from 'next-auth';

// Extend the types globally
declare module 'next-auth' {
  interface Session {
    user: {
      id: string;
      role?: string;
    } & DefaultSession['user'];
  }

  interface User extends DefaultUser {
    id: string;
    role?: string;
  }
}

declare module 'next-auth/jwt' {
  interface JWT extends DefaultJWT {
    id: string;
    role?: string;
  }
}
