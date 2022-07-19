import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';

import { MdTextSnippet } from 'react-icons/md';

import NotesMenu from '../features/notes/NotesMenu';

interface Props {
  viewMobileMenu: boolean,
  setViewMobileMenu: (viewMobileMenu: boolean) => void,
}

const Menu: React.FC<Props> = ({ viewMobileMenu, setViewMobileMenu }) => {
  const router = useRouter();
  const pathname = router.pathname.split('/')

  let menuPageSpecificContent;
  switch (pathname[1]) {
    case 'notes':
      menuPageSpecificContent = <NotesMenu />
      break;
  }

  return (
    <div className='sticky top-0 grow flex flex-col gap-4 items-center justify-evenly'>
      {/* menu header */}
      <Link href='/'>
        <a className='hidden md:flex btn btn-ghost normal-case text-xl'>Incedo</a>
      </Link>
      {/* content based on path */}
      {menuPageSpecificContent}
      {/* website navigation */}
      <nav className='w-full h-fit flex flex-col items-center gap-2'>
        {pathname[1] !== 'notes' &&
          <Link href='/notes'>
            <a
              className='flex flex-row gap-1 items-center w-40 btn btn-ghost text-lg'
              onClick={() => setViewMobileMenu(!viewMobileMenu)}
            >
              <MdTextSnippet />
              <span>Notes</span>
            </a>
          </Link>
        }
        {pathname[1] !== 'sessions' &&
          <Link href='/sessions'>
            <a
              className='flex flex-row gap-1 items-center w-40 btn btn-ghost text-lg'
              onClick={() => setViewMobileMenu(!viewMobileMenu)}
            >
              sessions
            </a>
          </Link>
        }
        {pathname[1] !== 'principles' &&
          <Link href='/principles'>
            <a
              className='flex flex-row gap-1 items-center w-40 btn btn-ghost text-lg'
              onClick={() => setViewMobileMenu(!viewMobileMenu)}
            >
              principles
            </a>
          </Link>
        }
      </nav >
      {/* menu footer */}
      <div className='w-full flex flex-row items-center justify-evenly'>
        <Link href='/support'>
          <a
            className='link link-hover'
            onClick={() => setViewMobileMenu(!viewMobileMenu)}
          >support</a>
        </Link>
        <Link href='/report_bugs'>
          <a
            className='link link-hover'
            onClick={() => setViewMobileMenu(!viewMobileMenu)}
          >report bugs</a>
        </Link>
      </div>
    </div>
  )
};

export default Menu;
