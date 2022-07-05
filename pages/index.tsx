import type { NextPage } from 'next';
import { useFetchUserQuery } from '../app/services/account';
import Navbar from '../components/Navbar';


const Home: NextPage = () => {
  const { data: user } = useFetchUserQuery({})

  return (
    <div className='w-full flex flex-row'>
      {/* left bar */}
      <div className='w-full md:max-w-xs lg:max-w-sm hidden md:flex flex-col'>
        <div className='sticky top-0 w-full h-screen flex flex-col'>
          {/* sign in form used in /login page */}
        </div>
      </div>
      {/* content */}
      <div className='grow flex flex-col'>
        <Navbar user={user} />
      </div>
    </div>
  )
};

export default Home;
