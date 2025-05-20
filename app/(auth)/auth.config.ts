import type { NextAuthConfig } from 'next-auth';

export const authConfig: NextAuthConfig = {
  debug: true,
  pages: {
    signIn: '/login',
    newUser: '/',
  },
  providers: [
    // added later in auth.ts since it requires bcrypt which is only compatible with Node.js
    // while this file is also used in non-Node.js environments
  ],
  callbacks: {
    // The authorized callback is replaced by our custom middleware implementation
  },
};

// Conditionally add trustHost
if (
  process.env.NEXTAUTH_URL?.includes('localhost') ||
  process.env.NODE_ENV === 'development'
) {
  authConfig.trustHost = true;
}
