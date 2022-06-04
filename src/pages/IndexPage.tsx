import React from 'react';
import { useAppSelector } from '../hooks/store';
import { selectCurrentUser } from '../features/account/accountSlice';

const IndexPage: React.FC = () => {
  const user = useAppSelector(selectCurrentUser)

  if (!user) return <PublicIndexPage />

  return (
    <div>
      <h1>Authenticated Index Page</h1>
    </div>
  )
}

const PublicIndexPage: React.FC = () => {
  return (
    <div className='h-screen flex flex-col items-center justify-center gap-2'>
      <h1>Website is currently under construction.</h1>
      <p>All you can do is sign up and wait for features.</p>
    </div>
  )
}

export default IndexPage;
