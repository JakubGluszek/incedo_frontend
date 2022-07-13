import React from 'react';
import { MdTextSnippet } from 'react-icons/md';

const NotesMenu: React.FC = () => {
  return (
    <div className='w-full h-fit flex flex-col items-center gap-8'>
      <div className='flex flex-row items-center text-accent text-lg gap-2'>
        <MdTextSnippet size={24} />
        <span className=''>notes</span>
      </div>
    </div>
  )
};

export default NotesMenu;
