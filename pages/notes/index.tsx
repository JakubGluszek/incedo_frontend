import { KeyboardEvent, useState } from 'react';
import { useRouter } from 'next/router';
import { useViewportSize } from '@mantine/hooks';

import { MdAddCircle, MdOutlineArrowBack, MdCancel, MdSearch } from 'react-icons/md';

import { NextPageWithLayout, Note } from '../../types';
import Layout from '../../components/Layout';
import NotesPreviews from '../../features/notes/NotesPreviews';
import NoteCreate from '../../features/notes/NoteCreate';
import { useFetchNotesQuery, useSearchNotesMutation } from '../../app/services/notes';
import { useAppSelector } from '../../hooks/store';
import { selectAllNotes } from '../../features/notes/notesSlice';

const Notes: NextPageWithLayout = () => {
  const { isUninitialized, isLoading } = useFetchNotesQuery({});
  const [searchNotes] = useSearchNotesMutation();

  const notes = useAppSelector(selectAllNotes);
  const [searchedNotes, setSearchedNotes] = useState<Note[]>([]);

  const [search, setSearch] = useState('');
  const [viewSearch, setViewSearch] = useState(false);
  const [viewCreate, setViewCreate] = useState(false);

  const router = useRouter();
  const { width } = useViewportSize();

  const isDesktop = width >= 768

  const handleSearch = async (e: KeyboardEvent) => {
    console.log(e)
    if (e.keyCode === 13) {
      try {
        const data = await searchNotes(search).unwrap()
        setSearchedNotes(data)
      } catch (error) {
        console.log(error)
      }
    }
  }

  return (
    <div className='w-full max-w-screen-sm xl:max-w-screen-lg h-fit flex flex-col gap-2 pb-12 md:pb-0'>
      {/* desktop action bar */}
      <div className={`z-40 animate-in slide-in-from-top-12 duration-200 sticky top-16 w-full ${viewCreate ? 'h-52' : 'h-16'} hidden md:flex flex-col p-2 px-8 gap-4 border-b-[1px] border-base-200 bg-base-100`}>
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
      <div className={`z-30 animate-in slide-in-from-bottom-12 duration-200 fixed bottom-0 w-full max-w-screen-sm ${viewCreate ? 'h-36' : 'h-14'} md:hidden bg-base-100 border-t-[1px] border-base-200`}>
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
              defaultValue={search}
              autoFocus
              onKeyUp={e => handleSearch(e)}
              onChange={e => setSearch(e.currentTarget.value)}
              className='input input-sm input-bordered w-full'
            />
          </label>
        </div>
      }
      {/* page content */}
      <NotesPreviews
        notes={viewSearch && searchedNotes.length > 0 ? searchedNotes : notes}
        loading={isUninitialized || isLoading}
      />
    </div>
  )
};

Notes.getLayout = page => (
  <Layout>
    {page}
  </Layout>
)

export default Notes;
