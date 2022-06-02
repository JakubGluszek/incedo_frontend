import React from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useGetTokenMutation } from '../app/services/account';

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

  const form = (
    <form className='flex flex-col gap-2'
      onSubmit={handleSubmit(onSubmit)}
    >
      <label htmlFor='email'>Your Email</label>
      <input id='email' {...register('email', { required: 'Email required.' })} type='email' />
      <input type='submit' />
    </form>
  )

  const google = (
    <a href={`${process.env.REACT_APP_API_HOST}/account/signin/google`}>
      <span>Sign in with google</span>
    </a>
  )

  return (
    isUninitialized
      ?
      <div>
        {form}
        {google}
        <p>If you have no account, it will be created automatically.</p>
      </div>
      :
      <div>
        <p>Check your inbox.</p>
        <p>Click the link we sent to {watch('email')} to sign in.</p>
        <button onClick={() => navigate('/')}>OK</button>
      </div>
  )
}

export default SignInPage;
