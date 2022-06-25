import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Draggable } from 'react-beautiful-dnd';
import { format, fromUnixTime, formatDistanceToNow } from 'date-fns';

import { ImBook } from 'react-icons/im';
import { MdCancel, MdDelete, MdDragHandle, MdKeyboardArrowRight } from 'react-icons/md';

import { IStateNotebook } from './interfaces';
import { useDeleteNotebookMutation } from '../../app/services/notebooks';
import { motion } from 'framer-motion';

interface Props {
  editMode: boolean,
  notebook: IStateNotebook
};

const NotebookPreview: React.FC<Props> = ({ notebook, editMode }) => {
  const [removeNotebook] = useDeleteNotebookMutation();
  const [confirmDelete, setConfirmDelete] = useState(false);

  const navigate = useNavigate();

  const deleteNotebook = () => {
    if (confirmDelete) {
      removeNotebook(notebook.id)
    }
    setConfirmDelete(!confirmDelete)
  }

  const created_at = format(fromUnixTime(notebook.created_at), 'MM/dd/yyyy')
  const edited_at = formatDistanceToNow(fromUnixTime(notebook.edited_at), { addSuffix: true})

  return (
    <Draggable draggableId={`notebook-${notebook.id}`} index={notebook.rank}>
      {(provided, snapshot) => (
        <div className={`w-full md:max-w-none h-48 ${snapshot.isDragging ? 'shadow-xl' : null}`}
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
                ? // Default
                <div className='w-full h-full flex flex-col items-center gap-1'>
                  <div {...provided.dragHandleProps} className='hidden'></div>
                  
                  <div className='w-full grow flex flex-row items-center justify-between gap-2'>
                    <div className='h-full flex flex-row items-center'>
                      <p className='break-words opacity-90 text-sm sm:text-base'>
                        {notebook.about
                          ? `${notebook.about.slice(0, 64)}${notebook.about.length > 64 ? '...' : ''}`
                          : 'no description'
                        }
                      </p>
                    </div>

                    <button className='p-1 rounded-md w-fit h-fit bg-transparent border-2 border-nord7 text-nord7 dark:text-nord7 hover:bg-nord8 hover:text-white dark:hover:text-nord0'
                      onClick={() => navigate(`/notebooks/${notebook.id}`)}
                    >
                      <MdKeyboardArrowRight className='w-6 h-6 md:w-8 md:h-8' />
                    </button>
                  </div>
                  
                  <div className='w-full h-fit py-0.5 flex flex-col text-sm opacity-60'>
                    <span>Last edited: {edited_at}</span>
                    <span>Created: {created_at}</span>
                  </div>

                </div>
                : // Edit mode
                <div className='w-full h-full flex flex-row items-center justify-between gap-2'>

                  <button className='z-10 btn-action' onClick={() => deleteNotebook()}>
                    <MdDelete className='w-6 h-6 md:w-8 md:h-8' />
                  </button>

                  {confirmDelete
                    ?
                    <motion.div className='grow flex flex-row items-center justify-between'
                      initial={{ opacity: 0, translateY: -32 }}
                      animate={{ opacity: 1, translateY: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <span className='text-center'>Press again to confirm.</span>
                      <button className='btn-action' onClick={() => setConfirmDelete(!confirmDelete)}>
                        <MdCancel className='w-6 h-6 md:w-8 md:h-8' />
                      </button>
                    </motion.div>
                    : null
                  }

                  <div className='btn-action' {...provided.dragHandleProps}>
                    <MdDragHandle className='w-6 h-6 md:w-8 md:h-8' />
                  </div>

                </div>
              }
            </div>
          </div>
        </div>
      )
      }
    </Draggable >
  )
};

export default NotebookPreview;
