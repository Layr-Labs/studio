'use client';

import Form from 'next/form';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { useSearchParams } from 'next/navigation';
import { FcGoogle } from 'react-icons/fc';
import { Button } from './ui/button';
import { useActionState, startTransition } from 'react';
import { signIn } from 'next-auth/react';
import { googleAuth, type GoogleAuthActionState } from '@/app/(auth)/actions';


export function GoogleAuthButton() {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get('callbackUrl') || '/';

  // Don't redirect to favicon or other static assets
  const safeCallbackUrl = callbackUrl.includes('favicon.ico') || 
                         callbackUrl.includes('/_next/') ? 
                         '/' : callbackUrl;
  
  const handleGoogleSignIn = async () => {
    try {
      // Use NextAuth's signIn function directly
      await signIn('google', { 
        callbackUrl: safeCallbackUrl,
        redirect: true 
      });
    } catch (error) {
      console.error('Error during Google sign in:', error);
    }
  };

  return (
    <div className="space-y-6 mt-8">
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-zinc-200 dark:border-zinc-700" />
        </div>
      </div>

      <Button
        id="google-sign-in-button"
        onClick={handleGoogleSignIn}
        variant="outline"
        className="w-full flex items-center justify-center gap-5 py-5 text-sm font-medium text-zinc-700 hover:bg-zinc-50 dark:text-zinc-300 dark:hover:bg-zinc-800/50 transition-colors"
      >
        <FcGoogle className="w-5 h-5" />
        <span>Continue with Google</span>
      </Button>

      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-zinc-200 dark:border-zinc-700" />
        </div>
      </div>
    </div>
  );
}


export function AuthForm({
  action,
  children,
  defaultEmail = '',
}: {
  action: NonNullable<
    string | ((formData: FormData) => void | Promise<void>) | undefined
  >;
  children: React.ReactNode;
  defaultEmail?: string;
}) {
  return (
    <Form action={action} className="flex flex-col gap-4 px-4 sm:px-16">
      <div className="flex flex-col gap-2">
        <Label
          htmlFor="email"
          className="text-zinc-600 font-normal dark:text-zinc-400"
        >
          Email Address
        </Label>

        <Input
          id="email"
          name="email"
          className="bg-muted text-md md:text-sm"
          type="email"
          placeholder="user@acme.com"
          autoComplete="email"
          required
          autoFocus
          defaultValue={defaultEmail}
        />
      </div>

      <div className="flex flex-col gap-2">
        <Label
          htmlFor="password"
          className="text-zinc-600 font-normal dark:text-zinc-400"
        >
          Password
        </Label>

        <Input
          id="password"
          name="password"
          className="bg-muted text-md md:text-sm"
          type="password"
          required
        />
      </div>

      {children}
    </Form>
  );
}
