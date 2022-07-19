import { useRouter } from 'next/router';
import { useState } from 'react';

import { MdOutlineArrowBack, MdEdit, MdInfo } from 'react-icons/md';
import { VscOpenPreview } from 'react-icons/vsc';

import { NextPageWithLayout } from '../../types';
import { useFetchNoteByIdQuery } from '../../app/services/notes';
import Layout from '../../components/Layout';
import Note from '../../features/notes/Note';
import { useAppSelector } from '../../hooks/store';
import { selectNoteById } from '../../features/notes/notesSlice';
import NoteDetails from '../../features/notes/NoteDetails';


const NotePage: NextPageWithLayout = () => {
  const router = useRouter();
  const { id } = router.query
  const { isUninitialized, isLoading } = useFetchNoteByIdQuery(+id!)

  const note = useAppSelector(state => selectNoteById(state, +id!))

  const [preview, setPreview] = useState(false);
  const [viewDetails, setViewDetails] = useState(false);


  if (isUninitialized || isLoading) {
    return <span>fetching</span>
  }
  else if (!note) {
    return <span>note not found</span>
  }

  return (
    <div className='grow w-full max-w-screen-sm xl:max-w-screen-lg flex flex-col gap-2 pb-14 md:pb-0'>
      {/* desktop action bar */}
      <div className={`z-40 sticky top-16 w-full h-16 hidden md:flex flex-col gap-4 px-4 border-b-[1px] border-base-200 bg-base-100`}>
        <div className='w-full h-16 flex flex-row items-center justify-between'>
          {/* view details */}
          <button
            className='btn btn-sm btn-ghost'
            onClick={() => setViewDetails(!viewDetails)}
          >
            <MdInfo size={24} />
          </button>

          {/* switch between edit & preview modes */}
          <div className='ml-auto btn-group'>
            <button
              className={`btn btn-sm ${!preview ? 'btn-active' : 'btn-ghost'}`}
              onClick={() => setPreview(!preview)}
            >
              <MdEdit size={24} />
            </button>
            <button
              className={`btn btn-sm ${preview ? 'btn-active' : 'btn-ghost'}`}
              onClick={() => setPreview(!preview)}
            >
              <VscOpenPreview size={24} />
            </button>
          </div>
        </div>
      </div>
      {/* mobile action bar */}
      <div className={`z-30 fixed bottom-0 w-full max-w-screen-sm h-14 md:hidden bg-base-100 border-t-[1px] border-base-200`}>
        <div className='w-full h-14 flex flex-row items-center justify-evenly '>
          <button className='btn btn-ghost btn-circle'
            onClick={() => router.push('/notes')}
          >
            <MdOutlineArrowBack size={24} />
          </button>
          <label
            tabIndex={0}
            className="btn btn-ghost btn-circle swap swap-flip p-0.5"
          >
            <input type='checkbox' checked={!preview} onChange={() => setPreview(!preview)} />
            <MdEdit size={24} className='swap-off' />
            <VscOpenPreview className='swap-on' size={24} />
          </label>
          <button className='btn btn-ghost btn-circle'
            onClick={() => setViewDetails(!viewDetails)}
          >
            <MdInfo size={24} />
          </button>
        </div>
      </div>
      {/* page content */}
      <div className='grow flex flex-col p-4'>
        {/* note details */}
        <NoteDetails
          note={note}
          opened={viewDetails}
          setOpened={setViewDetails}
        />
        {/* note content */}
        <Note
          note={note}
          preview={preview}
        />
      </div>
    </div>
  )
};

NotePage.getLayout = page => (
  <Layout>
    {page}
  </Layout>
)

export default NotePage;
