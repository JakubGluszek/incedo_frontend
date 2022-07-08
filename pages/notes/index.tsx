import { useState } from 'react';
import { MdSearch } from 'react-icons/md';
import { useFetchNoteFoldersQuery } from '../../app/services/noteFolders';
import { useFetchNotesQuery } from '../../app/services/notes';
import Layout from '../../components/Layout';
import { NextPageWithLayout } from '../../types';

const Notes: NextPageWithLayout = () => {
  const [viewCreate, setViewCreate] = useState(false);

  useFetchNoteFoldersQuery({});
  useFetchNotesQuery({});

  return (
    <div className='w-full h-fit flex flex-col gap-2 border-b-[1px] border-base-200'>
      <div className='sticky top-0 w-full h-16 flex flex-row items-center justify-between p-2 px-6 gap-4'>
        <input
          className='input input-bordered input-sm w-64'
          type='text'
        />
        <button
          className={`btn btn-sm btn-primary ${viewCreate ? '' : 'btn-outline'}`}
          onClick={() => setViewCreate(!viewCreate)}
        >Create</button>
      </div>
    </div>
  )
};

Notes.getLayout = page => (
  <Layout>
    {page}
  </Layout>
)

export default Notes;
