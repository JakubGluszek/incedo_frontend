import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';

type View = 'notes' | 'shared' | 'trash'

const NotesMenuTop: React.FC = () => {
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
    <div className='w-full transition-width duration-200 btn-group'>
      <Link href='/notes'>
        <button className={`grow btn btn-sm transition-width duration-200 ease-in ${view === 'notes' ? 'btn-primary' : 'btn-ghost'}`}>notes</button>
      </Link>
      <Link href='/notes/shared'>
        <button className={`grow btn btn-sm transition-width duration-200 ease-in ${view === 'shared' ? 'btn-primary' : 'btn-ghost'}`}>shared</button>
      </Link>
      <Link href='/notes/trash'>
        <button className={`grow btn btn-sm transition-width duration-200 ease-in ${view === 'trash' ? 'btn-primary' : 'btn-ghost'}`}>trash</button>
      </Link>
    </div>
  )
};

export default NotesMenuTop;
