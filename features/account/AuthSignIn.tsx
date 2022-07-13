import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { FcGoogle } from 'react-icons/fc';
import { showNotification } from '@mantine/notifications';

import { useFetchTokenMutation } from '../../app/services/account';

interface Props {
  setEnterToken: (bool: boolean) => void
}

const SignIn: React.FC<Props> = ({ setEnterToken }) => {
  const [fetchToken, { isLoading, isSuccess, isError }] = useFetchTokenMutation();
  const { register, handleSubmit, watch } = useForm();
  const email = watch('email', '')

  const onSubmit = handleSubmit(async data => {
    try {
      await fetchToken(data.email).unwrap()
      showNotification({
        title: 'Success!',
        message: `Email with token sent to ${email}`,
        classNames: {
          root: 'notification translate-y-0',
          title: 'text-base-content'
        }
      })
    } catch (error) {
      console.log('error')
    }
  })

  useEffect(() => {
    if (isSuccess) {
      // display alert
      setEnterToken(true);
    };
  }, [setEnterToken, isSuccess])

  return (
    <>
      <form
        className='form-control gap-4'
        onSubmit={onSubmit}
      >
        <div>
          <label className='label'>
            <span className="label-text">Email</span>
            <span
              className='label-text-alt badge badge-secondary cursor-pointer'
              onClick={() => setEnterToken(true)}
            >
              I have the token
            </span>
          </label>
          <input
            className='input input-bordered w-full'
            type='email'
            {...register('email')}
          />
        </div>
        <input
          className={`btn ${email.length === 0 ? 'btn-disabled' : 'btn-primary text-primary-content'}`}
          type='submit'
          value='get token'
        />
      </form>
      <div className='divider'>or</div>
      <a
        className='btn btn-primary btn-outline flex gap-2'
        href={`${process.env.NEXT_PUBLIC_API}/account/auth/signin/google`}
      >
        <FcGoogle size={24} />
        <span>Sign in with google</span>
      </a>
    </>
  )
};

export default SignIn;
