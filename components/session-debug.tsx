'use client';

import { useSession } from 'next-auth/react';

export function SessionDebug() {
  const { data: session, status } = useSession();

  const isAuthenticated = !!session?.user;

  if (process.env.NODE_ENV !== 'development') {
    return null;
  }

  return (
    <div className="fixed bottom-2 right-2 bg-black/80 text-white p-2 rounded text-xs z-50">
      <div>Status: {status}</div>
      <div>Authenticated: {isAuthenticated ? 'Yes' : 'No'}</div>
      {session?.user && (
        <div>User: {session.user.email || session.user.name || 'Unknown'}</div>
      )}
    </div>
  );
} 