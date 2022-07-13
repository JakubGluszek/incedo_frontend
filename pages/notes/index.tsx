import { useState } from 'react';
import { useRouter } from 'next/router';

import { MdAddCircle, MdArrowBackIos, MdSearch } from 'react-icons/md';

import { NextPageWithLayout } from '../../types';
import { useFetchNoteFoldersQuery } from '../../app/services/noteFolders';
import { useFetchNotesQuery } from '../../app/services/notes';
import Layout from '../../components/Layout';
import NotesPreviews from '../../features/notes/NotesPreviews';
import { useAppSelector } from '../../hooks/store';
import { selectAllNotes } from '../../features/notes/notesSlice';

const Notes: NextPageWithLayout = () => {
  const [viewSearch, setViewSearch] = useState(false);
  const [viewCreate, setViewCreate] = useState(false);

  useFetchNoteFoldersQuery({});
  // make sure this call returns previews 
  // previews = (optimized notes without entire body)
  // pass ?previews=True
  useFetchNotesQuery({});

  const notes = useAppSelector(selectAllNotes);

  const router = useRouter();

  return (
    <div className='w-full max-w-screen-lg h-fit flex flex-col gap-2 pb-16 md:pb-0'>
      {/* desktop action bar */}
      <div className='z-30 sticky top-16 w-full h-16 hidden md:flex flex-row items-center justify-between p-2 px-8 gap-4 border-b-[1px] border-base-200 bg-base-100'>
        <button
          className='btn btn-sm'
        >
          <MdSearch size={20} />
        </button>
        <button
          className='btn btn-sm gap-1'
          onClick={() => setViewCreate(!viewCreate)}
        >
          <MdAddCircle size={20} />
          <span>create</span>
        </button>
      </div>
      {/* mobile action bar */}
      <div className='z-30 fixed bottom-0 w-full h-16 flex md:hidden flex-row items-center justify-evenly text-accent bg-base-100 border-t-[1px] border-base-200'>
        <button className='btn btn-ghost'
          onClick={() => router.push('/')}
        >
          <MdArrowBackIos size={24} />
        </button>
        <button className='btn btn-ghost'
          onClick={() => setViewCreate(!viewCreate)}
        >
          <MdAddCircle size={24} />
        </button>
        <button className='btn btn-ghost'
          onClick={() => setViewSearch(!viewSearch)}
        >
          <MdSearch size={24} />
        </button>
      </div>
      {/* page content */}
      <NotesPreviews notes={notes} />
    </div>
  )
};

Notes.getLayout = page => (
  <Layout>
    {page}
  </Layout>
)

export default Notes;
