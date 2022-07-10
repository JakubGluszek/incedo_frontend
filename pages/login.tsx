import { useEffect } from 'react';
import { NextPage } from 'next';
import Link from 'next/link';
import { useRouter } from 'next/router';

import { useAppSelector } from '../hooks/store';
import { selectCurrentUser } from '../features/account/accountSlice';
import Auth from '../features/account/Auth';

const Login: NextPage = () => {
  const router = useRouter()
  const { token } = router.query

  const user = useAppSelector(selectCurrentUser);

  useEffect(() => {
    if (user) {
      router.replace('/')
    }
  }, [user, router])

  return (
    <div className='w-full h-screen flex flex-col items-center justify-center'>
      <div className='max-w-screen-md flex flex-col md:flex-row gap-4 px-6'>
        <header className='prose text-center grow flex flex-col items-center justify-center'>
          <h1 className='text-lg text-center'>Welcome to <span className='font-semibold'>Incedo</span></h1>
          <p>here you can&nbsp;
            <span className='font-semibold tooltip' data-tip='If you are new, an account will be created automatically'>
              sign in or create&nbsp;
            </span>
            your&nbsp;
            <Link href='/' className='link'>
              incedo
            </Link>
            &nbsp;account
          </p>
        </header>
        <Auth token={token} />
      </div>
    </div>
  )
};

export default Login;
