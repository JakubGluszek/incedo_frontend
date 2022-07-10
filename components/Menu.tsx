import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { AnimatePresence, motion } from 'framer-motion';

import { MdTextSnippet } from 'react-icons/md';

import NotesMenu from '../features/notes/NotesMenu';
import SharedNotesMenu from '../features/notes/shared/SharedNotesMenu';
import NotesTrashMenu from '../features/notes/trash/NotesTrashMenu';

interface Props {
  showMobile: boolean,
  setShowMobile: (showMobile: boolean) => void,
}

const Menu: React.FC<Props> = ({ showMobile }) => {
  const router = useRouter();
  const pathname = router.pathname.split('/')

  let menuPageSpecificContent;
  switch (pathname[1]) {
    case 'notes':
      switch (pathname[2]) {
        case 'shared':
          menuPageSpecificContent = <SharedNotesMenu />
          break;
        case 'trash':
          menuPageSpecificContent = <NotesTrashMenu />
          break;
        default:
          menuPageSpecificContent = <NotesMenu />
          break;
      }
      break;
  }

  const menuContent = (
    <div className='w-full max-w-xs h-full flex flex-col gap-4 items-center justify-evenly'>
      <Link href='/'>
        <a className='hidden md:flex btn btn-ghost normal-case text-xl'>Incedo</a>
      </Link>
      {/* page specific content */}
      {menuPageSpecificContent}
      {/* website navigation */}
      <nav className='w-full h-fit flex flex-col items-center gap-1'>
        {pathname[1] !== 'notes' &&
          <Link href='/notes'>
            <a
              className='flex flex-row gap-1 items-center link link-hover'
            >
              <MdTextSnippet />
              <span>Notes</span>
            </a>
          </Link>
        }
        {pathname[1] !== 'snippets' &&
          <Link href='/snippets'>
            <a
              className='flex flex-row gap-1 items-center link link-hover'
            >
              snippets
            </a>
          </Link>
        }
        {pathname[1] !== 'sessions' &&
          <Link href='/sessions'>
            <a
              className='flex flex-row gap-1 items-center link link-hover'
            >
              sessions
            </a>
          </Link>
        }
        {pathname[1] !== 'principles' &&
          <Link href='/principles'>
            <a
              className='flex flex-row gap-1 items-center link link-hover'
            >
              principles
            </a>
          </Link>
        }
        {pathname[1] !== 'predictions' &&
          <Link href='/predictions'>
            <a
              className='flex flex-row gap-1 items-center link link-hover'
            >
              predictions
            </a>
          </Link>
        }
      </nav >
      <div className='w-full flex flex-row items-center justify-evenly'>
        <Link href='/support'>
          <a className='link link-hover'>support</a>
        </Link>
        <Link href='/report_bugs'>
          <a className='link link-hover'>report bugs</a>
        </Link>
      </div>
    </div>
  )

  return (
    <>
      {/* large screen menu */}
      <div className='sticky top-0 z-40 w-full md:max-w-xs lg:max-w-sm h-screen hidden md:flex flex-col items-center p-4 py-2 border-r-[1px] border-base-200'>
        {menuContent}
      </div>
      {/* mobile screen menu */}
      <AnimatePresence>
        {showMobile && (
          <motion.div
            className='z-40 fixed w-full h-full flex md:hidden flex-col items-center bg-base-100 py-16 border-r-[1px] border-base-200'
            initial={{ translateX: -window.innerWidth }}
            animate={{ opacity: 1, translateX: 0 }}
            exit={{ translateX: -window.innerWidth }}
            transition={{ duration: 0.3 }}
          >
            {menuContent}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
};

export default Menu;
