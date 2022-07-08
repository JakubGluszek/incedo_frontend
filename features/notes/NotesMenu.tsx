import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';

import NoteTree from './NoteTree';

type View = 'notes' | 'shared' | 'trash'

const NotesMenu: React.FC = () => {
  const router = useRouter();
  const [view, setView] = useState<View>('notes')

  const pathnames = router.pathname.split('/')

  useEffect(() => {
    if (pathnames.length === 2) {
      setView('notes')
    } else if (pathnames[2] === 'shared') {
      setView('shared')
    } else if (pathnames[2] === 'trash') {
      setView('trash')
    }
  }, [pathnames])

  return (
    <div className='w-full h-fit flex flex-col gap-4 overflow-y-auto overflow-x-hidden p-4'>
      {/* top */}
      <div className='flex flex-row btn-group'>
        <Link href='/notes'>
          <button className={`btn transition-width duration-200 ease-in ${view === 'notes' ? 'w-2/4 btn-primary': 'w-1/4 btn-ghost'}`}>notes</button>
        </Link>
        <Link href='/notes/shared'>
          <button className={`btn transition-width duration-200 ease-in ${view === 'shared' ? 'w-2/4 btn-primary': 'w-1/4 btn-ghost'}`}>shared</button>
        </Link>
        <Link href='/notes/trash'>
          <button className={`btn transition-width duration-200 ease-in ${view === 'trash' ? 'w-2/4 btn-primary': 'w-1/4 btn-ghost'}`}>trash</button>
        </Link>
      </div>
      <div className='w-full h-fit flex flex-col gap-1'>
        <input
          className='input input-sm input-bordered'
          type='text'
          placeholder='search'
        />
        <NoteTree />
      </div>
    </div>
  )
};

export default NotesMenu;
