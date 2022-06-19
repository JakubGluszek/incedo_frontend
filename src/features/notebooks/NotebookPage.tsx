import React from 'react';
import { useParams } from 'react-router-dom';

import { MdAddBox, MdSearch } from 'react-icons/md';
import { ImBook } from 'react-icons/im';

import { useFetchNotebookByIdQuery } from '../../app/services/notebooks';
import { useAppSelector } from '../../hooks/store';
import { selectNotebookById } from './notebooksSlice';
import { selectNotesByNotebookId } from '../notes/notesSlice';

import { FadeInPage } from '../../components/AnimatedPages';
import NotePreview from '../notes/NotePreview';
import BottomActionBar from '../../components/BottomActionBar';

const NotebookPage: React.FC = () => {
  // get notebook id from url path
  const { id } = useParams();
  const notebook_id = parseInt(id!)
  // fetch & select notebook, notes with given notebook id
  const { isUninitialized, isLoading } = useFetchNotebookByIdQuery({ id: parseInt(id!) })
  const notebook = useAppSelector(state => selectNotebookById(state, notebook_id))
  const notes = useAppSelector(state => selectNotesByNotebookId(state, notebook_id))

  // handle content logic
  let content;
  // loading
  if (isUninitialized || isLoading) {
    content = <span>loading</span>
  }
  // no notebook found
  else if (!notebook) {
    content = <span>Notebook not found</span> // custom 404 page here
  }
  // success
  else {
    let notesPreviews;
    if (notes.length > 0) {
      notesPreviews = notes.map(note => <NotePreview key={note.id} note={note} />)
    } else {
      notesPreviews = <span>empty</span>
    }
    content = (
      <>
        {/* Page Heading */}
        <div className='flex flex-row gap-2 items-center text-nord3 dark:text-nord4'>
          <ImBook size={32} />
          <span className='text-2xl'>{notebook.label}</span>
        </div>
        {/* List of notes */}
        <div className='w-full h-fit flex flex-col sm:grid sm:grid-cols-2 gap-4'>
          {notesPreviews}
        </div>
      </>
    )
  }

  return (
    <FadeInPage>
      {/* page content */}
      <div className='max-w-screen-sm mx-auto w-full flex flex-col py-8 pb-20 px-6 gap-8 text-sm sm:text-base'>
        {content}
      </div>
      {/* fixed botton action bar */}
      <BottomActionBar back='/notebooks'>
        <button className='btn-nav'>
          <MdAddBox className='w-6 h-6 sm:w-8 sm:h-8' />
        </button>
        <button className='btn-nav'>
          <MdSearch className='w-6 h-6 sm:w-8 sm:h-8' />
        </button>
      </BottomActionBar>
    </FadeInPage>
  )
};

export default NotebookPage;
