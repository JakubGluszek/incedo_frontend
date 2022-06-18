import React, { useState } from 'react';
import { MdKeyboardBackspace, MdNote, MdSearch } from 'react-icons/md';
import { VscEdit, VscOpenPreview } from 'react-icons/vsc';
import { useNavigate } from 'react-router-dom';
import BottomNav from '../../components/BottomNav';
import { AnimatedPage } from '../../components/layouts/AnimatedPages';
import CodeMirror from '@uiw/react-codemirror'
import MarkdownPreview from "@uiw/react-markdown-preview";

const note = {
  id: 1,
  label: 'first note',
  body: 'lorem ipsum here',
  rank: 0,
  notebook_id: 1
}

const NotePage: React.FC = () => {
  const navigate = useNavigate();
  const [body, setBody] = useState('')
  const [preview, setPreview] = useState(false)

  return (
    <AnimatedPage>
      <div className='max-w-screen-sm mx-auto w-full flex flex-col py-8 pb-20 px-6 gap-8 text-sm sm:text-base'>
        <div className='flex flex-row gap-2 items-center text-nord3 dark:text-nord4'>
          <MdNote size={32} />
          <span className='text-2xl'>First note</span>
        </div>
        <div className='w-full h-fit flex flex-col bg-white dark:bg-nord0 p-4 rounded-sm'>
          {preview
            ? <MarkdownPreview source={body} />
            : <CodeMirror value={body} onChange={setBody} />
          }
        </div>
      </div>

      <BottomNav>
        <button className='btn-nav' onClick={() => navigate(`/notebooks/${note.notebook_id}`)}>
          <MdKeyboardBackspace className='w-6 h-6 sm:w-8 sm:h-8' />
        </button>
        <button className='btn-nav'
          onClick={() => setPreview(!preview)}
        >
          {preview
            ? <VscEdit className='w-6 h-6 sm:w-8 sm:h-8' />
            : <VscOpenPreview className='w-6 h-6 sm:w-8 sm:h-8' />
          }
        </button>
        <button className='btn-nav'>
          <MdSearch className='w-6 h-6 sm:w-8 sm:h-8' />
        </button>
      </BottomNav>
    </AnimatedPage>
  )
};

export default NotePage;
