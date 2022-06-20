import React from 'react';
import { useNavigate } from 'react-router-dom';

import { TiArrowRight } from 'react-icons/ti';
import { ImFileText2 } from 'react-icons/im';

import { INote } from './interfaces';
import { tryNavigate } from '../../utils';

interface Props {
  note: INote
}

const NotePreview: React.FC<Props> = ({ note }) => {
  const navigate = useNavigate();

  return (
    <section key={note.id} className='w-full h-fit flex flex-col hover:cursor-pointer sm:hover:cursor-default p-4 gap-2 bg-white dark:bg-nord0 rounded-md hover:shadow-md'
      onClick={() => tryNavigate(navigate, `/notebooks/${note.notebook_id}/${note.id}`)}
    >
      {/* heading */}
      <div className='w-full h-fit flex flex-row items-center gap-2'>
        <ImFileText2 size={32} className='min-w-fit min-h-fit' />
        <span className='text-xl break-all'>{note.label}</span>
      </div>

      {/* content */}
      <div className='w-full h-16 flex flex-row items-center justify-between'>
        {/* body snippet */}
        <span className='text-nord3 dark:text-nord6 opacity-80 text-sm break-words'>
          {note.body.slice(0, 96)}...
        </span>
        
        {/* navigate button */}
        <button className='hidden w-fit h-full sm:flex items-center justify-center btn-nav bg-nord9 text-white hover:bg-nord10 dark:text-nord0 dark:hover:bg-nord10'
          onClick={() => navigate(`/notebooks/${note.notebook_id}/${note.id}`)}
          aria-label='Navigate to "note" page'
        >
          <TiArrowRight size={24} />
        </button>
      </div>
    </section>
  )
};

export default NotePreview;
