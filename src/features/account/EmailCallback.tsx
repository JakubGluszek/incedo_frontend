import React, { useCallback, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useGetTokenMutation, useSignInMutation } from '../../app/services/account';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';

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
  // display appropriate content based on request status

  return content;
}

const EnterEmail: React.FC = () => {
  const { handleSubmit, register, watch } = useForm()
  const navigate = useNavigate()
  const [getToken, { isUninitialized }] = useGetTokenMutation()

  const onSubmit = async ({ email }: { [x: string]: string }) => {
    await getToken({ email })
  }

  return (
    <div className='grow p-6 flex flex-col items-center justify-center gap-4 text-center'>
      {isUninitialized
        ?
        <>
          <h3>Your sign in link has expired</h3>
          <p>Enter the email address associated with your account, and we'll send a new magic link to your inbox.</p>
          <form onSubmit={handleSubmit(onSubmit)}>
            <label htmlFor='email'>Your email</label>
            <input id='email' type='email' {...register('email', { required: 'Email required.' })} />
            <input type='submit' />
          </form>
        </>
        :
        <div className='bg-nord0 p-4 rounded-sm flex flex-col gap-4 items-center'>
          <p>Check your inbox</p>
          <p>An email has been sent to {watch('email')}</p>
          <button className='w-fit bg-nord10 p-2 px-4 rounded-sm' onClick={() => navigate('/', { replace: true })}>OK</button>
        </div>
      }
    </div>
  )
}

export default EmailCallback;
