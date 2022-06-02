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
    <div>
      <h1>Public index page</h1>
    </div>
  )
}

export default IndexPage;
