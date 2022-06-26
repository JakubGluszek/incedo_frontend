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
    <header className={`z-50 sticky top-0 w-full h-16 bg-nord6 dark:bg-dark_bg transition-height duration-300 ${scrollTop > 80 && 'h-20 shadow-md shadow-slate-200/50 dark:shadow-black/10'}`}>
      <div className='wrapper-lg h-full flex flex-row items-center justify-between'>
        <div className='flex flex-row items-center gap-1'>
          <Link
            className='btn text-2xl font-bold tracking-widest'
            to='/'
          >
            Incedo
          </Link>
          <Transition
            show={scrollTop > 80 * 4}
            enter='transition-all duration-300'
            enterFrom='opacity-0 -translate-y-8'
            enterTo='opacity-100'
            leave='transition-all duration-300'
            leaveFrom='opacity-100'
            leaveTo='opacity-0 -translate-y-8'
          >
            <button
              className='btn text-nord7'
              onClick={() => scrollTo(0)}
              aria-label='Scroll to top'
            >
              <MdArrowUpward className='' />
            </button>
          </Transition>
        </div>
        <nav className='flex items-center gap-1'>
          <ToggleTheme />
          {children}
        </nav>
      </div>
    </header>
  )
};

export default Header;
