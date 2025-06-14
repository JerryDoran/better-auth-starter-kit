import { signOut } from '@/lib/auth-client';
import { Icons } from '../icons';
import { useRouter } from 'next/navigation';

export default function SignOutButton() {
  const router = useRouter();
  async function handleSignOut() {
    await signOut({
      fetchOptions: {
        onSuccess: () => {
          router.push('/login');
        },
      },
    });
  }

  return (
    <div
      className='flex items-center gap-2 cursor-pointer'
      onClick={handleSignOut}
    >
      <Icons.logout />
      Log out
    </div>
  );
}
