import { MongoDBAdapter } from '@auth/mongodb-adapter';
import { compare } from 'bcryptjs';
import NextAuth, { AuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

import { clientPromise } from '@/lib/mongodb';

import { User } from '@/types/user';

export const authOptions: AuthOptions = {
  adapter: MongoDBAdapter(clientPromise),
  session: {
    strategy: 'jwt',
  },
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        email: {
          label: 'Email',
          type: 'email',
          placeholder: 'example@example.com',
        },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error('Invalid credentials');
        }

        const client = await clientPromise;
        const db = client.db();

        const user = await db
          .collection<User>('users')
          .findOne({ email: credentials.email });

        if (!user) throw new Error('Invalid email');

        const isValid = await compare(credentials.password, user.password);
        if (!isValid) throw new Error('Invalid password');

        if (user.role !== 'Admin') {
          throw new Error('Access denied'); // Only Admins allowed
        }
        return {
          id: user._id.toString(),
          name: user.name,
          email: user.email,
          role: user.role,
        };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.role = user.role;
      }
      return token;
    },
    async session({ session, token }) {
      (session.user as { id: string }).id = token.id as string;
      (session.user as { role?: string }).role = token.role as string;
      return session;
    },
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
