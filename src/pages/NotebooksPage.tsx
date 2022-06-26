import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { ImBooks } from 'react-icons/im';
import { VscOpenPreview } from 'react-icons/vsc';
import {
  MdAdd,
  MdEdit,
  MdRemove,
  MdSearch
} from 'react-icons/md';
import { BsArrowLeftShort } from 'react-icons/bs';

import NotebookCreate from '../features/notebooks/NotebookCreate';
import Notebooks from '../features/notebooks/Notebooks';
import FeatureLayout from '../components/FeatureLayout';
import { useFetchNotebooksQuery } from '../app/services/notebooks';

// fetch notebooks, handle page actions
const NotebooksPage: React.FC = () => {
  const { isUninitialized, isLoading } = useFetchNotebooksQuery({});

  const [displaySearch, setDisplaySearch] = useState(false);
  const [displayCreate, setDisplayCreate] = useState(false);
  const [editMode, setEditMode] = useState(false);

  const navigate = useNavigate();

  const actions = (
    <>
      <button className='btn-action'
        onClick={() => navigate('/')}
      >
        <BsArrowLeftShort className='' />
      </button>
      <button className={`btn-action hover:bg-nord10 dark:hover:bg-nord10 ${editMode && 'bg-nord10'}`}
        onClick={() => setEditMode(!editMode)}
      >
        {editMode
          ? <VscOpenPreview className='' />
          : <MdEdit className='' />
        }
      </button>
      <button className={`btn-action hover:bg-nord10 dark:hover:bg-nord10 ${displayCreate && 'bg-nord10'}`}
        onClick={() => setDisplayCreate(!displayCreate)}
      >
        {displayCreate
          ? <MdRemove className='' />
          : <MdAdd className='' />
        }
      </button>
      <button className={`btn-action ${displaySearch && 'bg-nord8'}`}
        onClick={() => setDisplaySearch(!displaySearch)}
      >
        {displaySearch
          ? <MdRemove className='' />
          : <MdSearch className='' />
        }
      </button>
    </>
  )

  return (
    <FeatureLayout actions={actions}>
      <div className='heading'>
        <ImBooks size={32} className='min-w-6 min-h-6' />
        <h1>Notebooks</h1>
      </div>
      <NotebookCreate display={displayCreate} setDisplay={setDisplayCreate} />
      <Notebooks
        editMode={editMode}
        displaySearch={displaySearch}
        loading={isUninitialized || isLoading}
      />
    </FeatureLayout>
  )
};

export default NotebooksPage;
