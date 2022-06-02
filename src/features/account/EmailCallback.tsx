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
    content = <h1>Fetching</h1>
  } else {
    content = <EnterEmail />
  }
  // display appropriate content based on request status

  return (
    <div>
      {content}
    </div>
  )
}

const EnterEmail: React.FC = () => {
  const { handleSubmit, register, watch } = useForm()
  const navigate = useNavigate()
  const [getToken, { isUninitialized }] = useGetTokenMutation()

  const onSubmit = async ({ email }: { [x: string]: string }) => {
    await getToken({ email })
  }

  return (
    isUninitialized
      ?
      <div>
        <p>Your sign in link has expired</p>
        <>Enter the email address associated with your account, and we'll send a new magic link to your inbox.</>
        <form onSubmit={handleSubmit(onSubmit)}>
          <label htmlFor='email'>Your email</label>
          <input id='email' type='email' {...register('email', { required: 'Email required.' })} />
          <input type='submit' />
        </form>
      </div>
      :
      <div>
        <p>Check your inbox</p>
        <p>An email has been sent to {watch('email')}</p>
        <button onClick={() => navigate('/')}>OK</button>
      </div>
  )
}

export default EmailCallback;
