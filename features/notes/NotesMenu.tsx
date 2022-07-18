import React from 'react';
import Link from 'next/link';

import { MdTextSnippet } from 'react-icons/md';

const NotesMenu: React.FC = () => {

  return (
    <div className='w-full h-fit flex flex-col items-center gap-8'>
      <Link href='/notes'>
        <div className='flex flex-row items-center text-lg gap-2'>
          <MdTextSnippet size={24} />
          <span className='link link-hover'>notes</span>
        </div>
      </Link>
    </div>
  )
};

export default NotesMenu;
