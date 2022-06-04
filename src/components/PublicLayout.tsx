import React from 'react';
import { Link } from 'react-router-dom';
import ToggleTheme from './ToggleTheme';

interface Props {
  children: React.ReactNode
}

const PublicLayout: React.FC<Props> = ({ children }) => {
  return (
    <div className='flex flex-col min-h-screen'>
      <div className='h-20'></div>
      <header className='w-screen h-16 fixed top-0'>
        <div className='px-6 w-full h-full flex flex-row items-center justify-between'>
          <Link to='/' className='text-2xl font-bold tracking-widest'>Incedo</Link>
          <nav className='flex text-lg gap-6'>
            <Link to='/signin'>Sign in</Link>
            <ToggleTheme />
          </nav>
        </div>
      </header>
      <main className='grow flex flex-col'>
        {children}
      </main>
    </div>
  )
}

export default PublicLayout;
