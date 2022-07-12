import React from 'react';

import { Note } from '../../types';
import NotePreview from './NotePreview';

interface Props {
  notes: Note[]
}

const NotesPreviews: React.FC<Props> = ({ notes }) => {

  const previews = notes.map(n => <NotePreview key={n.id} note={n} />)

  return (
    <div className='w-full h-fit flex flex-col gap-2 md:gap-4 p-4 md:p-8'>
      {previews}
    </div>
  )
};

export default NotesPreviews;
