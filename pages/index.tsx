import React from 'react';

import { NextPageWithLayout } from '../types';
import { useAppSelector } from '../hooks/store';
import { selectCurrentUser } from '../features/account/accountSlice';
import Layout from '../components/Layout';
import Welcome from './welcome';

const Home: NextPageWithLayout = () => {
  const [hasMounted, setHasMounted] = React.useState(false);
  const user = useAppSelector(selectCurrentUser);

  React.useEffect(() => {
    setHasMounted(true);
  }, []);

  if (!hasMounted || !user) {
    return <Welcome />
  }

  return (
    <div>
      <p>private home page</p>
    </div>
  )
};

Home.getLayout = page => (
  <Layout>
    {page}
  </Layout>
)

export default Home;
