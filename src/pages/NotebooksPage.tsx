import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { ImBooks } from 'react-icons/im';
import { VscOpenPreview } from 'react-icons/vsc';
import {
  MdAdd,
  MdEdit,
  MdKeyboardArrowLeft,
  MdRemove,
  MdSearch
} from 'react-icons/md';

import { useFetchNotebooksQuery } from '../app/services/notebooks';
import NotebookCreate from '../features/notebooks/NotebookCreate';
import Notebooks from '../features/notebooks/Notebooks';
import PageHeading from '../components/PageHeading';
import FeatureLayout from '../components/FeatureLayout';

const NotebooksPage: React.FC = () => {
  const { isUninitialized, isLoading } = useFetchNotebooksQuery({});

  const [displayCreate, setDisplayCreate] = useState(false);
  const [editMode, setEditMode] = useState(false);
  // set sorting to be by rank when in editMode

  const navigate = useNavigate();

  const actions = (
    <>
      <button className='btn-action p-1 bg-nord7 hover:bg-nord8'
        onClick={() => navigate('/')}
      >
        <MdKeyboardArrowLeft className='w-8 h-8 md:w-10 md:h-10' />
      </button>
      <button className='btn-action'
        onClick={() => setEditMode(!editMode)}
      >
        {editMode
          ? <VscOpenPreview className='w-6 h-6 md:w-8 md:h-8' />
          : <MdEdit className='w-6 h-6 md:w-8 md:h-8' />
        }
      </button>
      <button className='btn-action'
        onClick={() => setDisplayCreate(!displayCreate)}
      >
        {displayCreate
          ? <MdRemove className='w-6 h-6 md:w-8 md:h-8' />
          : <MdAdd className='w-6 h-6 md:w-8 md:h-8' />
        }
      </button>
      <button className='btn-action bg-nord7 hover:bg-nord8'>
        <MdSearch className='w-6 h-6 md:w-8 md:h-8' />
      </button>
    </>
  )

  return (
    <FeatureLayout actions={actions}>
      <PageHeading
        icon={<ImBooks size={32} className='min-w-6 min-h-6' />}
        content={'Notebooks'}
      />
      <NotebookCreate display={displayCreate} setDisplay={setDisplayCreate} />
      {isUninitialized || isLoading
        ? <span>Fetching notebooks</span>
        : <Notebooks editMode={editMode} />
      }
    </FeatureLayout>
  )
};

export default NotebooksPage;
