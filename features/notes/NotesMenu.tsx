import React from 'react';
import Link from 'next/link';

import { MdTextSnippet } from 'react-icons/md';

const NotesMenu: React.FC = () => {

  return (
    <div className='w-full h-fit flex flex-col items-center gap-8'>
      <Link href='/notes'>
        <div className='flex flex-row items-center gap-2 w-40 btn btn-ghost text-lg'>
          <MdTextSnippet size={24} />
          <span>notes</span>
        </div>
      </Link>
    </div>
  )
};

export default NotesMenu;
