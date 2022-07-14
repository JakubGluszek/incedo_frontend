import { GetServerSidePropsContext } from 'next';
import { useRouter } from 'next/router';
import { useState } from 'react';

import { MdArrowBackIos, MdEdit } from 'react-icons/md';
import { VscOpenPreview } from 'react-icons/vsc';

import { NextPageWithLayout } from '../../types';
import { useFetchNoteByIdQuery } from '../../app/services/notes';
import Layout from '../../components/Layout';
import Note from '../../features/notes/Note';
import { useEffect } from 'react';

interface Props {
  id: number
}

const NotePage: NextPageWithLayout<Props> = ({ id }) => {
  const { data, isSuccess } = useFetchNoteByIdQuery(id)

  const [isEdit, setIsEdit] = useState(true);
  const [body, setBody] = useState('');

  const router = useRouter();

  const canSave = data && (data.body !== body && body !== '')

  useEffect(() => {
    if (data) {
      setBody(data.body)
    }
  }, [isSuccess, data])

  const actionBar = (
    <div className={`z-40 sticky top-16 w-full h-16 hidden md:flex flex-col gap-4 px-4 border-b-[1px] border-base-200 bg-base-100`}>
      <div className='w-full h-16 flex flex-row items-center justify-between'>
        {canSave &&
          <button className='btn'>save</button>
        }
        <div className='ml-auto btn-group'>
          <button
            className={`btn ${isEdit ? 'btn-active' : ''}`}
            onClick={() => setIsEdit(!isEdit)}
          >
            <MdEdit size={24} />
          </button>
          <button
            className={`btn ${!isEdit ? 'btn-active' : ''}`}
            onClick={() => setIsEdit(!isEdit)}
          >
            <VscOpenPreview size={24} />
          </button>
        </div>
      </div>
    </div>
  )

  const mobileActionBar = (
    <div className={`z-30 fixed bottom-0 w-full max-w-screen-sm h-16 md:hidden bg-base-100 border-t-[1px] border-base-200`}>
      <div className='w-full h-16 flex flex-row items-center justify-evenly '>
        <button className='btn btn-ghost'
          onClick={() => router.push('/notes')}
        >
          <MdArrowBackIos size={24} />
        </button>
        <button className='btn btn-ghost'
          onClick={() => null}
        >

        </button>
        <button className='btn btn-ghost'
          onClick={() => null}
        >

        </button>
      </div>
    </div>
  )

  return (
    <div className='w-full max-w-screen-sm xl:max-w-screen-lg h-fit flex flex-col gap-2 pb-16 md:pb-0'>
      {/* desktop action bar */}
      {actionBar}
      {/* mobile action bar */}
      {mobileActionBar}
      {/* page content */}
      <div className='w-full h-fit flex flex-col p-4'>
        {data &&
          <Note
            data={data}
            preview={!isEdit}
            body={body}
            setBody={setBody}
          />
        }
      </div>
    </div>
  )
};

export async function getServerSideProps(context: GetServerSidePropsContext) {
  return {
    props: {
      id: context.params?.id
    },
  }
}

NotePage.getLayout = page => (
  <Layout>
    {page}
  </Layout>
)

export default NotePage;
