import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Draggable, DraggableProvided } from 'react-beautiful-dnd';
import { format, fromUnixTime, formatDistanceToNow } from 'date-fns';

import { ImBook } from 'react-icons/im';
import { BsArrowRightShort } from 'react-icons/bs';
import { MdCancel, MdDelete, MdDragHandle } from 'react-icons/md';

import { IStateNotebook } from './interfaces';
import { useDeleteNotebookMutation } from '../../app/services/notebooks';

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
  };

  const created_at = format(fromUnixTime(notebook.created_at), 'MM/dd/yyyy')
  const edited_at = formatDistanceToNow(fromUnixTime(notebook.edited_at), { addSuffix: true })

  const contentPreview = (provided: DraggableProvided) => (
    <div className='grow flex'>
      <div className='w-3/4 h-full p-1 flex flex-col justify-evenly'>
        <p className='break-words opacity-90 text-sm sm:text-base'>
          {notebook.about
            ? `${notebook.about.slice(0, 64)}${notebook.about.length > 64 ? '...' : ''}`
            : 'no description'
          }
        </p>
        <div className='w-full h-fit py-0.5 flex flex-col text-sm opacity-60'>
          <span>Last edited: {edited_at}</span>
          <span>Created: {created_at}</span>
        </div>
      </div>
      <div className='w-1/4 h-full p-1 flex'>
        <button className='btn-action w-12 h-12 md:w-16 md:h-16 m-auto'
          onClick={() => navigate(`/notebooks/${notebook.id}`)}
        >
          <BsArrowRightShort className='m-auto ' />
        </button>
      </div>
    </div>
  )

  const contentEdit = (provided: DraggableProvided) => (
    <div className='grow flex'>
      <div className='w-3/4 h-full p-1 flex flex-row justify-start'>
        <button className='z-10 btn-action my-auto' onClick={() => deleteNotebook()}>
          <MdDelete className='' />
        </button>
        {confirmDelete &&
          <>
            <span className='text-center m-auto'>Press again to confirm.</span>
            <button className='btn-action m-auto' onClick={() => setConfirmDelete(!confirmDelete)}>
              <MdCancel className='' />
            </button>
          </>
        }

      </div>
      <div className='w-1/4 h-full p-1 flex'>
        <div className='btn-action m-auto' {...provided.dragHandleProps}>
          <MdDragHandle className='' />
        </div>
      </div>
    </div>
  )

  return (
    <Draggable draggableId={`notebook-${notebook.id}`} index={notebook.rank}>
      {(provided, snapshot) => (
        <div
          className={`w-full md:max-w-none h-64 card ${snapshot.isDragging ? 'shadow-xl' : null}`}
          {...provided.draggableProps}
          ref={provided.innerRef}
        >
          <div className='w-full h-full flex flex-col divide-y-2 divide-nord dark:divide-nord3'>
            <div className='h-1/5 heading justify-start gap-2'>
              <ImBook className='w-6 h-6 md:w-7 md:h-7' />
              <h4 className='break-all font-bold'>{notebook.label}</h4>
            </div>

            <div className='h-4/5 w-full pt-2 flex flex-row'>
              {editMode ? contentEdit(provided) : contentPreview(provided)}
            </div>
          </div>
        </div>
      )}
    </Draggable >
  )
};

export default NotebookPreview;
