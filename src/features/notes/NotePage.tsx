import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { MdSearch } from 'react-icons/md';
import { VscEdit, VscOpenPreview } from 'react-icons/vsc';

import { useFetchNoteByIdQuery } from '../../app/services/notes';
import { FadeInPage } from '../../components/AnimatedPage';
import ActionBar from '../../components/ActionBar';
import Note from './Note';

const NotePage: React.FC = () => {
  const { id } = useParams();
  const { data: note, isUninitialized, isLoading } = useFetchNoteByIdQuery({ id: parseInt(id!) })

  const [canEdit, setCanEdit] = useState(false)

  let content;
  if (isUninitialized || isLoading) {
    content = <span>loading</span>
  } else if (!note) {
    content = <span>note not found</span> // 404 page here
  } else {
    content = (
      <>
        <Note id={parseInt(id!)} editMode={canEdit} setEditMode={setCanEdit} />
      </>
    )
  }

  return (
    <>
      <FadeInPage>
        {/* page content */}
        <div className='max-w-screen-sm mx-auto w-full flex flex-col py-8 pb-20 px-6 gap-8 text-sm sm:text-base'>
          {content}
        </div>
      </FadeInPage>
      {note
        ?
        <ActionBar back={`/notebooks/${note.notebook_id}`}>
          <button className='btn-nav'
            onClick={() => setCanEdit(!canEdit)}
          >
            {
              canEdit
                ? <VscOpenPreview className='w-6 h-6 sm:w-8 sm:h-8' />
                : <VscEdit className='w-6 h-6 sm:w-8 sm:h-8' />
            }
          </button>
          <button className='btn-nav'>
            <MdSearch className='w-6 h-6 sm:w-8 sm:h-8' />
          </button>
        </ActionBar>
        : null
      }
    </>
  )
};

export default NotePage;
