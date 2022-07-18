import { useState } from 'react';
import { useRouter } from 'next/router';
import { useViewportSize } from '@mantine/hooks';

import { MdAddCircle, MdOutlineArrowBack, MdCancel, MdSearch } from 'react-icons/md';

import { NextPageWithLayout } from '../../types';
import { useFetchNotesQuery } from '../../app/services/notes';
import Layout from '../../components/Layout';
import NotesPreviews from '../../features/notes/NotesPreviews';
import { useAppSelector } from '../../hooks/store';
import { selectAllNotes } from '../../features/notes/notesSlice';
import NoteCreate from '../../features/notes/NoteCreate';

const Notes: NextPageWithLayout = () => {
  // make sure this call returns previews 
  // previews = (optimized notes without entire body)
  // pass ?previews=True
  useFetchNotesQuery({});
  const notes = useAppSelector(selectAllNotes);

  const [viewSearch, setViewSearch] = useState(false);
  const [viewCreate, setViewCreate] = useState(false);

  const router = useRouter();
  const { width } = useViewportSize();

  const isDesktop = width >= 768

  return (
    <div className='w-full max-w-screen-sm xl:max-w-screen-lg h-fit flex flex-col gap-2 pb-12 md:pb-0'>
      {/* desktop action bar */}
      <div className={`z-40 sticky top-16 w-full ${viewCreate ? 'h-52' : 'h-16'} hidden md:flex flex-col p-2 px-8 gap-4 border-b-[1px] border-base-200 bg-base-100`}>
        <div className='w-full h-16 flex flex-row items-center justify-between'>
          <button
            className='btn btn-sm w-24 flex flex-row gap-1'
            onClick={() => setViewSearch(!viewSearch)}
          >
            {viewSearch
              ? <MdCancel size={20} />
              : <MdSearch size={20} />
            }
            <span>{viewSearch ? 'cancel' : 'search'}</span>
          </button>
          <button
            className='btn btn-sm w-24 gap-1'
            onClick={() => setViewCreate(!viewCreate)}
          >
            {viewCreate
              ? <MdCancel size={20} />
              : <MdAddCircle size={20} />
            }
            <span>{viewCreate ? 'cancel' : 'create'}</span>
          </button>
        </div>
        {/* create note section */}
        {viewCreate &&
          <div className='w-full h-32 flex'>
            <NoteCreate />
          </div>
        }
      </div>
      {/* mobile action bar */}
      <div className={`z-30 fixed bottom-0 w-full max-w-screen-sm ${viewCreate ? 'h-36' : 'h-14'} md:hidden bg-base-100 border-t-[1px] border-base-200`}>
        <div className='w-full h-14 flex flex-row items-center justify-evenly '>
          <button className='btn btn-ghost btn-circle'
            onClick={() => router.push('/')}
          >
            <MdOutlineArrowBack size={24} />
          </button>
          <button className='btn btn-ghost btn-circle'
            onClick={() => setViewCreate(!viewCreate)}
          >
            {viewCreate
              ? <MdCancel size={24} />
              : <MdAddCircle size={24} />
            }
          </button>
          <button className='btn btn-ghost btn-circle'
            onClick={() => setViewSearch(!viewSearch)}
          >
            <MdSearch size={24} />
          </button>
        </div>
        {/* create note section */}
        {viewCreate &&
          <div className='w-full h-16 flex p-2 px-4'>
            <NoteCreate />
          </div>
        }
      </div>
      {/* search section */}
      {viewSearch &&
        <div className={`z-30 sticky animate-in slide-in-from-top-10 ${viewCreate && isDesktop ? 'top-[270px]' : isDesktop ? 'top-32' : 'top-16'} w-full h-fit bg-base-100 p-4 md:px-8 border-b-[1px] border-base-200`}>
          <label className='input-group input-group-sm max-w-screen-sm'>
            <span className='label-text flex flex-row items-center gap-1'>
              <MdSearch size={24} />
            </span>
            <input
              type='text'
              autoFocus
              className='input input-sm input-bordered w-full'
            />
          </label>
        </div>
      }
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
