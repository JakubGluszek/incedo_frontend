import React from 'react';
import { useForm } from 'react-hook-form';
import { Navigate, useNavigate } from 'react-router-dom';
import { useGetTokenMutation } from '../app/services/account';
import { FcGoogle } from 'react-icons/fc';
import { selectCurrentUser } from '../features/account/accountSlice';
import { useAppSelector } from '../hooks/store';
import { MdEmail } from 'react-icons/md'
import { AnimatedPage } from '../components/layouts/AnimatedPages';

const SignInPage: React.FC = () => {
  const [getToken, { isUninitialized }] = useGetTokenMutation()
  const { handleSubmit, register, watch } = useForm()
  const navigate = useNavigate()

  const onSubmit = async ({ email }: { [x: string]: string }) => {
    try {
      await getToken({ email }).unwrap()
    } catch (err) {
      console.log(err)
    }
  }

  const form =
    <form onSubmit={handleSubmit(onSubmit)}>
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


  const google = (
    <a className='flex flex-row items-center gap-2 text-nord9 hover:text-nord10 text-lg font-bold bg-white dark:bg-nord0 transition-shadow hover:shadow-md p-2 rounded-md'
      href={`${process.env.REACT_APP_API_HOST}/account/auth/signin/google`}
    >
      <FcGoogle size={24} />
      <span>Sign in with google</span>
    </a>
  )

  let content;

  if (isUninitialized) {
    content = (
      <>
        <h2>Sign in with email</h2>
        <div className='p-6 transition-shadow hover:shadow-md bg-white dark:bg-nord0 rounded-md'>
          {form}
        </div>
        <span className='opacity-90'>or</span>
        {google}
        <p className='text-center opacity-90'>If you have no account, it will be created automatically.</p>
      </>
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

  const user = useAppSelector(selectCurrentUser)
  if (user) {
    return <Navigate to='/' replace />
  }

  return (
    <AnimatedPage>
      <div className='grow p-8 flex flex-col items-center justify-center gap-6 lg:text-xl'>
        {content}
      </div>
    </AnimatedPage>
  )
}

export default SignInPage;
