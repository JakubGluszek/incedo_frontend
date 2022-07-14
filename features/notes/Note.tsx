import React, { useEffect, useState } from 'react';

import { Note } from '../../types';

interface Props {
  data: Note,
  body: string,
  setBody: (body: string) => void,
  preview: boolean
}

const Note: React.FC<Props> = ({ data, body, setBody, preview }) => {
  let noteBody;

  if (preview) {
    noteBody = (
      <div>
        {body}
      </div>
    )
  } else {
    noteBody = (
      <textarea
        className='textarea textarea-bordered w-full overflow-hidden'
        value={body}
        onChange={e => setBody(e.currentTarget.value)}
      />
    )
  }

  return (
    <div className='w-full h-fit flex flex-col gap-6'>
      <span className='text-xl'>{data.label}</span>
      {noteBody}
    </div>
  )
};

export default Note;
