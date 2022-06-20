import React from 'react';
import { Link } from 'react-router-dom';
import { Transition } from '@tailwindui/react';

import { MdArrowUpward } from 'react-icons/md';

import useScrollTo from '../hooks/useScrollTo';
import ToggleTheme from './ToggleTheme';

interface Props {
  children?: React.ReactNode
};

const Header: React.FC<Props> = ({ children }) => {
  const [scrollTop, scrollTo] = useScrollTo();
  return (
    <header className={`z-50 sticky top-0 w-full bg-nord6 dark:bg-dark-bg transition-height duration-300 ${scrollTop < 80 ? 'h-16': 'h-20 shadow-md shadow-slate-200/50 dark:shadow-black/10'}`}>
      <div className='px-6 max-w-screen-lg m-auto h-full flex flex-row items-center justify-between'>
        <div className='flex flex-row items-center gap-1 sm:gap-4'>
          <Link to='/' className='text-2xl font-bold tracking-widest p-2 hover:bg-white dark:hover:bg-nord0 rounded-md'>Incedo</Link>
          <Transition
            show={scrollTop > 80}
            enter="transition-all duration-300"
            enterFrom="opacity-0 -translate-y-8"
            enterTo="opacity-100"
            leave="transition-all duration-300"
            leaveFrom="opacity-100"
            leaveTo="opacity-0 -translate-y-8"
          >
            <button className='btn-nav text-nord7'
              onClick={() => scrollTo(0)}
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
  )
};

export default Header;
