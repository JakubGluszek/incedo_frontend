import React from 'react';
import { useRouter } from 'next/router';

import { Note } from '../../types';

interface Props {
  note: Note
}

const NotePreview: React.FC<Props> = ({ note }) => {
  const { id, label, body } = note
  const router = useRouter();

  return (
    <div
      className='w-full h-40 bg-base-200 hover:bg-base-300 cursor-pointer rounded-md p-2 md:p-4'
      onClick={() => router.push(`/notes/${id}`)}
    >
      <p className='md:text-lg'>{label}</p>
      <p className='w-full max-w-full h-24 overflow-hidden overflow-ellipsis text-sm opacity-80'>{body}</p>
    </div>
  )
};

export default NotePreview;
