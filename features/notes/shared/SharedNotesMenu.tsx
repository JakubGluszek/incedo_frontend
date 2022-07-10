import React from 'react';

import NotesMenuTop from '../NotesMenuTop';

const SharedNotesMenu: React.FC = () => {
  return (
    <div className='w-full h-fit flex flex-col items-center gap-4'>
      <NotesMenuTop />
    </div>
  )
};

export default SharedNotesMenu;
