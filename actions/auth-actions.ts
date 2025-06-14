'use server';

import { auth } from '@/lib/auth';
import { APIError } from 'better-auth/api';
import { redirect } from 'next/navigation';

type State = {
  errorMessage?: string | null;
};

export async function signUp(prevState: State, formData: FormData) {
  const rawFormData = {
    email: formData.get('email') as string,
    password: formData.get('pwd') as string,
    firstName: formData.get('firstname') as string,
    lastName: formData.get('lastname') as string,
  };

  console.log('rawFormData', rawFormData);

  const { email, password, firstName, lastName } = rawFormData;

  try {
    await auth.api.signUpEmail({
      body: {
        name: `${firstName} ${lastName}`,
        email,
        password,
      },
    });
  } catch (error) {
    if (error instanceof APIError) {
      switch (error.status) {
        case 'UNPROCESSABLE_ENTITY':
          return { errorMessage: 'User already exists. Please try another' };
        case 'BAD_REQUEST':
          return { errorMessage: 'Email is invalid' };
        default:
          return {
            errorMessage:
              'An unexpected error occurred. Please try again later.',
          };
      }
    }

    console.error('sign up with email and password error', error);
  }

  redirect('/dashboard');
}

export async function signIn(prevState: State, formData: FormData) {
  const rawFormData = {
    email: formData.get('email') as string,
    password: formData.get('pwd') as string,
  };

  const { email, password } = rawFormData;

  try {
    await auth.api.signInEmail({
      body: {
        email,
        password,
      },
    });
  } catch (error) {
    console.error('ERROR', error);
    if (error instanceof APIError) {
      switch (error.status) {
        case 'UNAUTHORIZED':
          return { errorMessage: 'Invalid credentials' };
        case 'BAD_REQUEST':
          return { errorMessage: 'Invalid credentials' };
        default:
          return {
            errorMessage:
              'An unexpected error occurred. Please try again later.',
          };
      }
    }

    console.error('sign in with email and password error', error);
  }

  redirect('/dashboard');
}
