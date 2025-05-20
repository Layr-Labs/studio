'use client';

import { useRouter } from 'next/navigation';
import { useState, Suspense } from 'react';
import { GoogleAuthButton } from '@/components/auth-form';

export default function Page() {
  const router = useRouter();
  const [isSuccessful, setIsSuccessful] = useState(false);

  return (
    <div className="flex h-dvh w-screen items-start pt-12 md:pt-0 md:items-center justify-center bg-background">
      <div className="w-full max-w-md overflow-hidden rounded-2xl flex flex-col gap-12">
        <div className="flex flex-col items-center justify-center gap-2 px-4 text-center sm:px-16">
          <h3 className="text-xl font-semibold dark:text-zinc-50">Sign In / Sign Up</h3>
          <p className="text-sm text-gray-500 dark:text-zinc-400 mb-4">
            Use your Google account to sign in or create a new account
          </p>
          <Suspense fallback={<div>Loading...</div>}>
            <GoogleAuthButton />
          </Suspense>
        </div>
      </div>
    </div>
  );
}
