import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import ToggleTheme from './ToggleTheme';

interface Props {
  children: React.ReactNode
}

const PublicLayout: React.FC<Props> = ({ children }) => {
  const [scrollTop, setScrollTop] = useState(0)

  useEffect(() => {
    const onScroll = () => setScrollTop(window.pageYOffset)

    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const header = (
    <header className={`transition-height duration-300 w-screen ${scrollTop > 0 ? 'h-16' : 'h-20'} fixed top-0 bg-slate-100 dark:bg-[#242933] ${scrollTop > 0 ? 'shadow-md shadow-slate-200/50 dark:shadow-black/10' : ''}`}>
      <div className='px-6 w-full h-full flex flex-row items-center justify-between'>
        <Link to='/' className='text-2xl font-bold tracking-widest'>Incedo</Link>
        <nav className='flex flex-row text-lg gap-6 items-center'>
          <Link to='/signin' className='p-2 rounded-md hover:bg-white dark:hover:bg-nord0'>Sign in</Link>
          <ToggleTheme />
        </nav>
      </div>
    </header>
  )

  return (
    <div className='flex flex-col min-h-screen'>
      <div className='h-20'>{/* spacing because header is fixed */}</div>
      {header}
      <main className='grow flex flex-col'>
        {children}
      </main>
      <footer className='flex flex-row items-center justify-center h-10'>
        <span>© 2022 Incedo, Inc.</span>
      </footer>
    </div>
  )
}

export default PublicLayout;
