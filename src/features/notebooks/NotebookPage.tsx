import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { MdAddBox, MdEdit, MdSearch } from 'react-icons/md';
import { ImBook } from 'react-icons/im';

import { useFetchNotebookByIdQuery, useUpdateNotebookMutation } from '../../app/services/notebooks';
import { useAppSelector } from '../../hooks/store';
import { selectNotebookById } from './notebooksSlice';
import { selectNotesByNotebookId } from '../notes/notesSlice';

import { FadeInPage } from '../../components/AnimatedPage';
import NotePreview from '../notes/NotePreview';
import ActionBar from '../../components/ActionBar';
import useScrollTo from '../../hooks/useScrollTo';
import NoteCreate from '../notes/NoteCreate';

const NotebookPage: React.FC = () => {
  // get notebook id from url path
  const { id } = useParams();
  const notebook_id = parseInt(id!)

  // fetch & select notebook & notes with given notebook id
  const { isUninitialized, isLoading } = useFetchNotebookByIdQuery({ id: parseInt(id!) })
  const notebook = useAppSelector(state => selectNotebookById(state, notebook_id))
  const notes = useAppSelector(state => selectNotesByNotebookId(state, notebook_id))

  // notebook state
  const [, scrollTo] = useScrollTo();
  const [editMode, setEditMode] = useState(false)
  const [label, setLabel] = useState('')
  const [about, setAbout] = useState('')
  const [update] = useUpdateNotebookMutation();

  const [createNote, setCreateNote] = useState(false)

  useEffect(() => {
    if (notebook) {
      setLabel(notebook.label)
      if (notebook.about) {
        setAbout(notebook.about)
      }
    }
  }, [notebook]);

  useEffect(() => {
    if (editMode) {
      scrollTo(0);
    }
  }, [editMode])

  const handleUpdate = () => {
    if (notebook) {
      if (label !== notebook.label || about !== notebook.about) {
        update({ ...notebook, label, about })
      };
    };
    setEditMode(false)
  };

  let content;
  if (isUninitialized || isLoading) {
    content = <span>loading</span>
  }
  else if (!notebook) {
    content = <span>Notebook not found</span> // custom 404 page here
  }
  // success
  else {
    let notesPreviews;
    if (notes.length > 0) {
      const sortedNotes = notes.sort((a, b) => b.updated_at - a.updated_at)
      notesPreviews = sortedNotes.map(note => <NotePreview key={note.id} note={note} />)
    } else {
      notesPreviews = <span>empty</span>
    }
    content = (
      <>
        {/* Page Heading */}
        <div className='flex flex-row gap-2 items-center text-nord3 dark:text-nord4'>
          <ImBook size={32} className='min-w-fit min-h-fit' />
          {editMode
            ?
            <input className='text-lg'
              placeholder='label'
              maxLength={32}
              type='text'
              defaultValue={notebook.label}
              onChange={e => setLabel(e.currentTarget.value)}
            />
            : <h1>{notebook.label}</h1>
          }
        </div>
        {/* notebook 'about' section */}
        {editMode
          ?
          <>
            <textarea className='h-24'
              placeholder='About'
              defaultValue={notebook.about ? notebook.about : ''}
              onChange={e => setAbout(e.currentTarget.value)}
            />
            <button className='submit' onClick={() => handleUpdate()}>
              Update
            </button>
          </>
          : <span>{notebook.about ? notebook.about : 'No description'}</span>
        }
        <NoteCreate display={createNote} setDisplay={setCreateNote} notebook_id={notebook.id} />
        {/* List of notes */}
        <div className='w-full h-fit flex flex-col sm:grid sm:grid-cols-2 gap-4'>
          {notesPreviews}
        </div>
      </>
    )
  };

  return (
    <>
      <FadeInPage>
        {/* page content */}
        <div className='max-w-screen-sm mx-auto w-full flex flex-col py-8 pb-20 px-6 gap-8 text-sm sm:text-base overflow-x-hidden'>
          {content}
        </div>
        {/* fixed botton action bar */}
      </FadeInPage>

      <ActionBar back='/notebooks'>
        <button className={`btn-nav ${editMode ? 'active' : ''}`}
          onClick={() => setEditMode(!editMode)}
        >
          <MdEdit className='w-6 h-6 sm:w-8 sm:h-8' />
        </button>
        <button className={`btn-nav ${createNote ? 'active' : ''}`}
          onClick={() => setCreateNote(!createNote)}
        >
          <MdAddBox className='w-6 h-6 sm:w-8 sm:h-8' />
        </button>
        <button className='btn-nav'>
          <MdSearch className='w-6 h-6 sm:w-8 sm:h-8' />
        </button>
      </ActionBar>
    </>
  )
};

export default NotebookPage;
