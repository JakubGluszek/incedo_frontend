import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import CodeMirror from '@uiw/react-codemirror'
import MarkdownPreview from "@uiw/react-markdown-preview";

import { MdSearch } from 'react-icons/md';
import { ImFileText2 } from 'react-icons/im';
import { VscEdit, VscOpenPreview } from 'react-icons/vsc';

import { useFetchNoteByIdQuery } from '../../app/services/notes';
import { FadeInPage } from '../../components/AnimatedPages';
import BottomActionBar from '../../components/BottomActionBar';

const NotePage: React.FC = () => {
  const { id } = useParams();
  const { data: note, isUninitialized, isLoading } = useFetchNoteByIdQuery({ id: parseInt(id!) })

  const [body, setBody] = useState('')
  const [preview, setPreview] = useState(false)

  useEffect(() => {
    if (note) {
      setBody(note.body)
    }
  }, [note])

  let content;
  let actionBar;
  if (isUninitialized || isLoading) {
    content = <span>loading</span>
  } else if (!note) {
    content = <span>note not found</span> // 404 page here
  } else {
    content = (
      <>
        {/* page heading */}
        <div className='flex flex-row gap-2 items-center text-nord3 dark:text-nord4'>
          <ImFileText2 size={32} />
          <span className='text-2xl'>First note</span>
        </div>

        {/* note */}
        <div className='w-full h-fit flex flex-col bg-white dark:bg-nord0 p-4 rounded-sm'>
          {
            preview
              ? <MarkdownPreview source={body} />
              : <CodeMirror value={body} onChange={setBody} />
          }
        </div>
      </>
    )

    actionBar = (
      <BottomActionBar back={`/notebooks/${note.notebook_id}`}>
        <button className='btn-nav'
          onClick={() => setPreview(!preview)}
        >
          {
            preview
              ? <VscEdit className='w-6 h-6 sm:w-8 sm:h-8' />
              : <VscOpenPreview className='w-6 h-6 sm:w-8 sm:h-8' />
          }
        </button>
        <button className='btn-nav'>
          <MdSearch className='w-6 h-6 sm:w-8 sm:h-8' />
        </button>
      </BottomActionBar>
    )
  }

  return (
    <FadeInPage>
      {/* page content */}
      <div className='max-w-screen-sm mx-auto w-full flex flex-col py-8 pb-20 px-6 gap-8 text-sm sm:text-base'>
        {content}
      </div>
      {/* fixed note action bar */}
      {actionBar}
    </FadeInPage>
  )
};

export default NotePage;
