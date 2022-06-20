import React from 'react';
import { useNavigate } from 'react-router-dom';

import { ImBook } from 'react-icons/im';

import { IStateNotebook } from './interfaces';
import { MdKeyboardArrowRight } from 'react-icons/md';

interface Props {
  notebook: IStateNotebook
};

const NotebookPreview: React.FC<Props> = ({ notebook }) => {
  const navigate = useNavigate();

  return (
    <div className='w-full max-w-sm md:max-w-none h-40 flex flex-col divide-y-2 dark:divide-nord3 bg-white dark:bg-nord0 p-4 rounded-md hover:shadow-lg'>
      <div className='w-full h-12 flex flex-row gap-2 py-2 items-center text-nord7'>
        <ImBook className='w-6 h-6 md:w-8 md:h-8 min-w-fit min-h-fit' />
        <h4 className='break-all font-bold'>{notebook.label}</h4>
      </div>
      <div className='w-full h-full flex flex-row items-center justify-between gap-2 pt-2'>
        <div className='h-full flex flex-row'>
          <p className='break-all opacity-80'>
            {notebook.about
              ? `${notebook.about.slice(0, 80)}${notebook.about.length > 80 ? '...': ''}`
              : 'no description'
            }
          </p>
        </div>
        <button className='btn-action w-fit h-fit'
          onClick={() => navigate(`/notebooks/${notebook.id}`)}
        >
          <MdKeyboardArrowRight className='w-6 h-6 md:w-8 md:h-8' />
        </button>
      </div>
    </div>
  )
};

export default NotebookPreview;
