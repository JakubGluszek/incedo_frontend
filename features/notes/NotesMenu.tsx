import React from 'react';

import NotesMenuTop from './NotesMenuTop';
import NoteTree from './NoteTree';

const NotesMenu: React.FC = () => {
  return (
    <div className='w-full h-fit flex flex-col items-center gap-4'>
      <NotesMenuTop />
      <NoteTree />
    </div>
  )
};

export default NotesMenu;
