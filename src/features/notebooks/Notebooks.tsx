import React from 'react';

import { useAppSelector } from '../../hooks/store';
import { selectAllNotebooks } from './notebooksSlice';
import NotebookPreview from './NotebookPreview';

const Notebooks: React.FC = () => {
  const notebooks = useAppSelector(selectAllNotebooks);

  const previews = notebooks.map(n => <NotebookPreview key={n.id} notebook={n} />)
  return (
    <div className='w-full h-fit flex flex-col md:grid md:grid-cols-2 gap-4 items-center'>
      {previews.length > 0
        ? previews      
        : <span>no notebooks yet.. try creating one</span>
      }
    </div>
  )
};

export default Notebooks;
