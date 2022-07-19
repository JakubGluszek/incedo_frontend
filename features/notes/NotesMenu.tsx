import React from 'react';
import Link from 'next/link';

import { MdTextSnippet } from 'react-icons/md';

const NotesMenu: React.FC = () => {

  return (
    <div className='w-full h-fit flex flex-col items-center gap-8'>
      <Link href='/notes'>
        <button className='btn btn-ghost w-48 text-lg flex flex-row items-center gap-2'>
          <MdTextSnippet size={24} />
          <span>notes</span>
        </button>
      </Link>
    </div>
  )
};

export default NotesMenu;
