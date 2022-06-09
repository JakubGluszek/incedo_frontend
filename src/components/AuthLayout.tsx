import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import ToggleTheme from './ToggleTheme';

interface Props {
  children: React.ReactNode
}

const AuthLayout: React.FC<Props> = ({ children }) => {
  const [scrollTop, setScrollTop] = useState(0)

  useEffect(() => {
    const onScroll = () => setScrollTop(window.pageYOffset)

    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const header = (
    <header className={`transition-height duration-300 w-screen ${scrollTop > 0 ? 'h-16' : 'h-20'} fixed top-0 bg-slate-100 dark:bg-[#242933] ${scrollTop > 0 ? 'shadow-md shadow-slate-200/50 dark:shadow-black/10' : ''}`}>
      <div className='px-6 max-w-screen-lg m-auto h-full flex flex-row items-center justify-between'>
        <Link to='/' className='text-2xl font-bold tracking-widest p-2 hover:bg-white dark:hover:bg-nord0 rounded-md'>Incedo</Link>
        <nav className='flex text-lg gap-6'>
          <ToggleTheme />
        </nav>
      </div>
      {/* */}
    </header>
  )

  return (
    <>
      <div className='flex flex-col min-h-screen'>
        <div className='h-16'>{/* spacing because header is fixed */}</div>
        {header}
        <main className='grow flex flex-col max-w-screen-md w-full mx-auto p-6'>
          {children}
        </main>
      </div>
      <footer className='flex flex-row items-center justify-center h-10'>
        <span>© 2022 Incedo, Inc.</span>
      </footer>
    </>
  )
}

export default AuthLayout;
