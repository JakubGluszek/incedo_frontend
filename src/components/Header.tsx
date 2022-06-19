import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Transition } from '@tailwindui/react';

import { MdArrowUpward } from 'react-icons/md';

import ToggleTheme from './ToggleTheme';

interface Props {
  children?: React.ReactNode
};

const Header: React.FC<Props> = ({ children }) => {
  const [scrollTop, setScrollTop] = useState(0);

  // author - https://stackoverflow.com/a/48942924/19312806
  const scrollToTop = () => {
    const c = document.documentElement.scrollTop || document.body.scrollTop;
    if (c > 0) {
      window.requestAnimationFrame(scrollToTop);
      window.scrollTo(0, c - c / 8);
    };
  };

  useEffect(() => {
    const onScroll = () => setScrollTop(window.pageYOffset)

    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, []);

  return (
    <>
      <div className='h-20'>{/* spacing because header is fixed */}</div>
      <header className={`z-50 transition-height duration-300 w-screen ${scrollTop > 0 ? 'h-16' : 'h-20'} fixed top-0 bg-nord6 dark:bg-[#242933] ${scrollTop > 0 ? 'shadow-md shadow-slate-200/50 dark:shadow-black/10' : ''}`}>
        <div className='px-6 max-w-screen-lg m-auto h-full flex flex-row items-center justify-between'>
          <div className='flex flex-row items-center gap-4'>
            <Link to='/' className='text-2xl font-bold tracking-widest p-2 hover:bg-white dark:hover:bg-nord0 rounded-md'>Incedo</Link>
            <Transition
              show={scrollTop > 80}
              enter="transition-opacity duration-75"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="transition-opacity duration-150"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <button className='btn-nav text-nord7'
                onClick={() => scrollToTop()}
              >
                <MdArrowUpward size={32} aria-label='Scroll to top' />
              </button>
            </Transition>
          </div>
          <nav className='flex text-lg gap-1 items-center'>
            <ToggleTheme />
            {children}
          </nav>
        </div>
      </header>
    </>
  )
};

export default Header;
