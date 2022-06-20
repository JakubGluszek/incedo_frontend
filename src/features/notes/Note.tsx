import ReactCodeMirror from '@uiw/react-codemirror';
import MarkdownPreview from '@uiw/react-markdown-preview';
import React, { useEffect, useState } from 'react';
import { ImFileText2 } from 'react-icons/im';
import { useUpdateNoteMutation } from '../../app/services/notes';
import { useAppSelector } from '../../hooks/store';
import { selectNoteById } from './notesSlice';

interface Props {
  id: number,
  editMode: boolean,
  setEditMode: (editMode: boolean) => void
};

const Note: React.FC<Props> = ({ id, editMode, setEditMode }) => {
  const note = useAppSelector(state => selectNoteById(state, id))
  const [label, setLabel] = useState(note ? note.label: '')
  const [body, setBody] = useState(note ? note.body: '')

  const [update] = useUpdateNoteMutation();

  const handleUpdate = () => {
    if (note) {
      if (label !== note.label || body !== note.body) {
        update({ ...note, label, body })
      };
    }
    setEditMode(false)
  };

  useEffect(() => {
    if (!editMode) {
      handleUpdate();
    }
  }, [editMode])

  if (!note) {
    return <span>No note</span>
  }

  return (
    <>
      {/* title etc */}
      <div className='flex flex-row gap-2 items-center text-nord3 dark:text-nord4'>
        <ImFileText2 size={32} className='min-w-fit min-h-fit' />
        {editMode
          ?
          <input className='text-lg'
            placeholder='label'
            type='text'
            maxLength={64}
            defaultValue={note.label}
            onChange={e => setLabel(e.currentTarget.value)}
          />
          : <span className='text-2xl'>{note.label}</span>
        }
      </div>
      {/* body */}
      <div className='w-full h-fit flex flex-col bg-white dark:bg-nord0 p-4 rounded-sm'>
        {editMode
          ? <ReactCodeMirror value={body} onChange={setBody} />
          : <MarkdownPreview source={body} />
        }
      </div>
    </>
  )
};

export default Note;
