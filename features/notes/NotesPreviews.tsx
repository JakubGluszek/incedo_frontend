import React from 'react';

import { Note } from '../../types';
import NotePreview from './NotePreview';


interface Props {
  notes: Note[],
  loading: boolean
}

const NotesPreviews: React.FC<Props> = ({ loading, notes }) => {
  const previews = notes.map(n => <NotePreview key={n.id} note={n} />)

  const loadingPreviews = Array.from(Array(10).keys()).map(n =>
    <div key={n}
      className='w-full h-40 bg-base-200 cursor-pointer rounded-md p-2 md:p-4 flex flex-col gap-2'
    >
      <p className='bg-base-300 w-full h-8 md:text-lg animate-pulse rounded-md'></p>
      <p className='w-full max-w-full h-full overflow-hidden overflow-ellipsis text-sm opacity-80 animate-pulse bg-base-300'></p>
    </div>
  )

  return (
    <div className='w-full h-fit flex flex-col gap-2 md:gap-4 p-4 md:p-8'>
      {loading
        ? loadingPreviews
        : previews
      }
    </div>
  )
};

export default NotesPreviews;
