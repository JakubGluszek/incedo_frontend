import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';

import { FcGoogle } from 'react-icons/fc';
import { MdEmail } from 'react-icons/md'

import { useFetchTokenMutation } from '../app/services/account';
import { FadeInPage } from '../components/AnimatedPages';

const SignInPage: React.FC = () => {
  const [fetchToken, { isUninitialized }] = useFetchTokenMutation()
  const { handleSubmit, register, watch } = useForm()
  const navigate = useNavigate()

  const onSubmit = async ({ email }: { [x: string]: string }) => {
    try {
      await fetchToken({ email }).unwrap()
    } catch (err) {
      console.log(err)
    };
  };

  let content;
  if (isUninitialized) {
    content = (
      <div className='grow flex flex-col items-center justify-center gap-4'>
        <h2>Sign in with email</h2>

        <form className='p-6 transition-shadow duration-300 hover:shadow-md bg-white dark:bg-nord0 rounded-md'
          onSubmit={handleSubmit(onSubmit)}
        >
          <label htmlFor='email'>Your Email</label>
          <div className='relative flex flex-row items-center'>
            <MdEmail size={24} className='absolute' />
            <input className='pl-8'
              id='email'
              type='email'
              {...register('email', { required: true })}
            />
          </div>
          <input className='submit' type='submit' />
        </form>

        <span className='opacity-90'>or</span>

        {/* google sign in */}
        <a className='flex flex-row items-center gap-2 text-nord9 hover:text-nord10 text-lg font-bold bg-white dark:bg-nord0 transition-shadow duration-300 hover:shadow-md p-2 rounded-md'
          href={`${import.meta.env.VITE_API}/account/auth/signin/google`}
        >
          <FcGoogle size={24} />
          <span>Sign in with google</span>
        </a>

        <p className='text-center opacity-80 text-sm'>If you have no account,<br />it will be created automatically.</p>
      </div>
    )
  } else {
    content = (
      <div className='bg-white dark:bg-nord0 p-4 rounded-md flex flex-col items-center gap-4 shadow-md'>
        <p>Check your inbox.</p>
        <p className='text-center'>
          Click the link we sent to <span className='font-bold'>{watch('email')}</span> to sign in.
        </p>
        <button className='submit'
          onClick={() => navigate('/', { replace: true })}
          aria-label='OK'
        >
          OK
        </button>
      </div>
    )
  }

  return (
    <FadeInPage>
      <div className='grow p-8 flex flex-col items-center justify-center gap-6 lg:text-xl'>
        {content}
      </div>
    </FadeInPage>
  )
};

export default SignInPage;
