'use client';

import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Link } from 'lucide-react';
import { resetPassword } from '@/lib/auth-client';

export default function ResetPasswordPage() {
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const searchParams = useSearchParams();
  const token = searchParams.get('token');
  const router = useRouter();

  useEffect(() => {
    if (!token) {
      setMessage('Invalid or missing token');
    }
  }, [token]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!token) return;
    const { error } = await resetPassword({
      token,
      newPassword: password,
    });
    if (error) {
      setMessage('Failed to reset password');
    } else {
      setMessage('Password reset successfully!');
      setTimeout(() => router.push('/login'), 3000);
    }
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
