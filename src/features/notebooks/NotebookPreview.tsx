import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Draggable } from 'react-beautiful-dnd';

import { ImBook } from 'react-icons/im';
import { MdDelete, MdDragHandle, MdKeyboardArrowRight } from 'react-icons/md';

import { IStateNotebook } from './interfaces';

interface Props {
  editMode: boolean,
  notebook: IStateNotebook
};

const NotebookPreview: React.FC<Props> = ({ notebook, editMode }) => {
  const navigate = useNavigate();

  return (
    <Draggable draggableId={`notebook-${notebook.id}`} index={notebook.rank}>
      {provided => (
        <div className='w-full max-w-sm md:max-w-none h-40 '
          {...provided.draggableProps}
          ref={provided.innerRef}
        >
          <div className='w-full h-full flex flex-col divide-y-2 divide-nord dark:divide-nord3 bg-white dark:bg-nord0 p-4 rounded-md hover:shadow-md'>
            <div className='w-full h-12 flex flex-row gap-2 py-2 items-center'>
              <ImBook className='w-6 h-6 md:w-8 md:h-8 min-w-fit min-h-fit' />
              <h4 className='break-all font-bold'>{notebook.label}</h4>
            </div>

            <div className='w-full h-full pt-2'>
              {!editMode
                ?
                <div className='w-full h-full flex flex-row items-center justify-between gap-2'>
                  <div {...provided.dragHandleProps} className='hidden'></div>
                  <div className='h-full flex flex-row items-center'>
                    <p className='break-words opacity-80'>
                      {notebook.about
                        ? `${notebook.about.slice(0, 80)}${notebook.about.length > 80 ? '...' : ''}`
                        : 'no description'
                      }
                    </p>
                  </div>
                  <button className='btn-action w-fit h-fit bg-transparent border-2 border-nord7 text-nord7 dark:text-nord7 hover:bg-nord8 hover:text-white dark:hover:text-nord0'
                    onClick={() => navigate(`/notebooks/${notebook.id}`)}
                  >
                    <MdKeyboardArrowRight className='w-4 h-4 md:w-6 md:h-6' />
                  </button>
                </div>
                :
                <div className='w-full h-full flex flex-row items-center justify-between'>
                  <button className='btn-action'>
                    <MdDelete className='w-6 h-6 md:w-8 md:h-8' />
                  </button>
                  <div className='btn-action'
                    {...provided.dragHandleProps}
                  >
                    <MdDragHandle className='w-6 h-6 md:w-8 md:h-8' />
                  </div>
                </div>
              }
            </div>
          </div>
        </div>
      )}
    </Draggable>
  )
};

export default NotebookPreview;
