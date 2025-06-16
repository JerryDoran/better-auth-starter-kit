'use client';

import { searchAccount } from '@/actions/auth-actions';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useRouter } from 'next/navigation';
import { encode } from 'punycode';
import { useState } from 'react';

export default function ForgotAccountPage() {
  const [email, setEmail] = useState('');
  const router = useRouter();

  async function handleSearch(e: React.FormEvent) {
    e.preventDefault();
    const emailFound = await searchAccount(email);

    if (emailFound) {
      router.push(
        `/login/forgot-account/forgot-password?email=${encodeURIComponent(
          email
        )}`
      );
    } else {
      router.push('/sign-up');
    }
  }

  return (
    <form
      onSubmit={handleSearch}
      className='p-6 max-w-md mx-auto space-y-4 container'
    >
      <h1 className='text-xl font-semibold'>Find your Account</h1>
      <Input
        type='email'
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder='Enter your email'
        required
        className='w-full p-2 border rounded'
      />
      <Button type='submit' className='cursor-pointer'>
        Search
      </Button>
    </form>
  );
}
