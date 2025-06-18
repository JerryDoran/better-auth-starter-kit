'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { forgetPassword } from '@/lib/auth-client';
import { set } from 'better-auth';

export default function ForgotPasswordPage() {
  const params = useSearchParams();
  const emailFromQuery = params.get('email') || '';
  const [email, setEmail] = useState(emailFromQuery);
  const [message, setMessage] = useState('');

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const { error } = await forgetPassword({
      email,
      redirectTo: `${window.location.origin}/login/forgot-account/forget-password/reset-password`,
    });

    if (error) {
      setMessage('Something went wrong. Please try again');
    } else {
      setMessage(`Password reset link sent to ${email}`);
    }
    setEmail('');
  }

  return (
    <form
      className='p-6 max-w-md mx-auto space-y-4 container'
      onSubmit={handleSubmit}
    >
      <h1 className='text-xl font-semibold'>Forget Password</h1>
      <Input
        type='email'
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder='Your Email'
        required
        className='w-full p-2 border rounded'
      />
      <div className='grid grid-cols-3 gap-2'>
        <Button type='submit' className='cursor-pointer'>
          Send Reset Link
        </Button>
        <Button asChild variant='outline'>
          <Link href='/login'>Sign In</Link>
        </Button>
      </div>
      {message && <p>{message}</p>}
    </form>
  );
}
