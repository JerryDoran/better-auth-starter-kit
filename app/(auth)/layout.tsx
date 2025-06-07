import { Icons } from '@/components/icons';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      <Button className='fixed top-5 left-5' variant='outline'>
        <Link href='/' aria-label='go home'>
          <Icons.arrowLeft className='size-4' />
        </Link>
      </Button>
      {children}
    </div>
  );
}
