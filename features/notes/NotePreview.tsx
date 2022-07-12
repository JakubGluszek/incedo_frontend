import React from 'react';
import { Note } from '../../types';

interface Props {
  note: Note
}

const NotePreview: React.FC<Props> = ({ note }) => {
  const { id, label, body, created_at, edited_at } = note

  return (
    <div className='w-full h-40 bg-base-200 rounded-md p-2 md:p-4'>
      <p className='md:text-lg'>{label}</p>
      <p className='w-full max-w-full h-24 overflow-hidden overflow-ellipsis text-sm opacity-80'>{body}</p>
    </div>
  )
};

export default NotePreview;
