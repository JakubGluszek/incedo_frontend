import React, { useState } from 'react';
import dynamic from 'next/dynamic';

import { Note } from '../../types';
import TextPreview from '../../components/TextPreview';
import { useUpdateNoteMutation } from '../../app/services/notes';

const TextEditor = dynamic(() => import('../../components/TextEditor'), { ssr: false });

interface Props {
  note: Note,
  preview: boolean,
}

const Note: React.FC<Props> = ({ note, preview }) => {
  const [updateNote] = useUpdateNoteMutation();

  const [body, setBody] = useState(note.body);
  const [label, setLabel] = useState(note.label);
  const [viewUpdateLabel, setViewUpdateLabel] = useState(false);

  const onChange = (v: string) => setBody(v);

  const handleSave = () => {
    try {
      updateNote({ id: note.id, body }).unwrap()
    } catch (error) {
      console.log(error)
    }
  }

  const handleUpdateLabel = async () => {
    if (label.length > 0) {
      try {
        await updateNote({ id: note.id, label }).unwrap()
        setViewUpdateLabel(false)
      } catch (error) {
        console.log(error)
      }
    }
  }

  const noteTitle = (
    viewUpdateLabel
      ?
      <>
        <input
          className='input input-sm w-full max-w-xs input-bordered'
          autoFocus
          maxLength={64}
          defaultValue={label}
          onChange={e => setLabel(e.currentTarget.value)}
          type='text'
        />
        <button
          className='btn btn-sm btn-primary'
          onClick={() => handleUpdateLabel()}
        >
          save
        </button>
      </>
      :
      <span
        className='cursor-pointer text-xl'
        onClick={() => setViewUpdateLabel(!viewUpdateLabel)}
      >
        {note.label}
      </span>
  )

  const canSave = body !== note.body

  return (
    <div className='grow flex flex-col gap-2'>
      {/* note header */}
      <div className='w-full h-12 flex flex-row items-center justify-between'>
        {noteTitle}
        {canSave &&
          <button
            className='btn btn-primary btn-sm md:w-[100px]'
            onClick={() => handleSave()}
          >save</button>
        }
      </div>
      {/* note body */}
      <div className='grow'>
        {preview
          ?
          <TextPreview markdown={body} />
          :
          <TextEditor
            body={body}
            onChange={onChange}
          />
        }
      </div>
    </div>
  )
};

export default Note;
