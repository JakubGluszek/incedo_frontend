import React, { useCallback, useEffect } from 'react';
import { Navigate, useSearchParams } from 'react-router-dom';
import { useGetTokenMutation, useSignInMutation } from '../../app/services/account';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useAppSelector } from '../../hooks/store';
import { selectCurrentUser } from './accountSlice';
import { MdEmail } from 'react-icons/md';
import { AnimatedPage } from '../../components/layouts/AnimatedPages';

// Get token from ?token query
// Try to sign in using token
// on success: redirect home
// on fail: email input field & redirect home on submit
const EmailCallback: React.FC = () => {
  const [params] = useSearchParams()
  const [signIn, { isLoading }] = useSignInMutation()
  const navigate = useNavigate()

  const signin = useCallback(async () => {
    const token = params.get("token")
    if (token) {
      try {
        await signIn({ token }).unwrap()
        navigate('/', { replace: true })
      } catch (err) {
        console.log(err)
      }
    }
  }, [navigate, params, signIn])

  useEffect(() => {
    signin()
  }, [signin])

  let content;

  if (isLoading) {
    content = <h1>fetching</h1>
  } else {
    content = <EnterEmail />
  }

  const user = useAppSelector(selectCurrentUser)
  if (user) {
    return <Navigate to='/' replace />
  }

  return content;
}

const EnterEmail: React.FC = () => {
  const { handleSubmit, register, watch } = useForm()
  const navigate = useNavigate()
  const [getToken, { isUninitialized }] = useGetTokenMutation()

  const onSubmit = async ({ email }: { [x: string]: string }) => {
    await getToken({ email })
  }

  let content;

  if (isUninitialized) {
    content = (
      <>
        <h3>Your sign in link has expired</h3>
        <p>Enter the email address associated with your account, and we'll send a new magic link to your inbox.</p>
        <form onSubmit={handleSubmit(onSubmit)}>
          <label htmlFor='email'>Your email</label>
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
      </>
    )
  } else {
    content = (
      <div className='bg-nord0 p-4 rounded-md flex flex-col gap-4 items-center'>
        <p>Check your inbox</p>
        <p>An email has been sent to {watch('email')}</p>
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
    <AnimatedPage>
      <div className='grow p-6 flex flex-col items-center justify-center gap-4 text-center lg:text-lg'>
        {content}
      </div>
    </AnimatedPage>
  )
}

export default EmailCallback;
