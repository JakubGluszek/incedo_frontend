import { showNotification } from '@mantine/notifications';
import { useRouter } from 'next/router';
import React, { useCallback, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useFetchUserQuery, useSignInMutation } from '../../app/services/account';

interface Props {
  token: string | string[] | undefined,
  setDisplay: (display: boolean) => void
}

const SendToken: React.FC<Props> = ({ token, setDisplay }) => {
  const [signIn, { isLoading, isSuccess, isError }] = useSignInMutation();
  useFetchUserQuery({}, { skip: !(!isLoading && isSuccess) })

  const router = useRouter();

  const handleSignIn = useCallback(async (token: string) => {
    try {
      await signIn(token).unwrap()
      showNotification({
        title: 'Success',
        message: 'Logged into account',
        color: 'green',
        classNames: {
          root: 'bg-base-100 border-base-200 text-base-content',
          title: 'text-base-content'
        }
      })
      router.replace('/')
    } catch (error) {
      showNotification({
        title: 'Error',
        message: 'Token invalid',
        color: 'red',
        classNames: {
          root: 'bg-base-100 border-base-200 text-base-content',
          title: 'text-base-content'
        }
      })
      router.push('/login')
    }
  }, [signIn, router])

  useEffect(() => {
    if (token) {
      handleSignIn(token.toString())
    }
  }, [token, handleSignIn])

  const { register, handleSubmit, watch } = useForm();
  const inputToken = watch('token', '');

  const onSubmit = handleSubmit(data => {
    handleSignIn(data.token)
  })

  return (
    <form
      className='form-control gap-2'
      onSubmit={onSubmit}
    >
      <div>
        <label className='label'>
          <span className='label-text'>Token</span>
          <span
            className='label-text-alt cursor-pointer badge badge-secondary'
            onClick={() => setDisplay(false)}
          >
            Resend
          </span>
        </label>
        <input
          defaultValue={token ? token : ''}
          className='input input-bordered w-full'
          type='text'
          autoComplete='off'
          {...register('token', { required: true })}
        />
      </div>
      <input
        className={`btn ${inputToken.length === 0 || isLoading ? 'btn-disabled' : 'btn-primary'}`}
        type='submit'
      />
    </form>
  )
};

export default SendToken;
