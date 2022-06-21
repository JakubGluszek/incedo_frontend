import React from 'react';
import { DragDropContext, Droppable, DropResult } from 'react-beautiful-dnd';

import { useAppSelector } from '../../hooks/store';
import { selectAllNotebooks } from './notebooksSlice';
import NotebookPreview from './NotebookPreview';
import { useUpdateNotebooksRanksMutation } from '../../app/services/notebooks';

interface Props {
  editMode: boolean
};

const Notebooks: React.FC<Props> = ({ editMode }) => {
  const [update] = useUpdateNotebooksRanksMutation();
  const notebooks = useAppSelector(selectAllNotebooks);

  const onDragStart = () => {
    if (window.navigator.vibrate) {
      window.navigator.vibrate(40);
    }
  };

  const onDragEnd = (result: DropResult) => {
    if (result.source.index !== result.destination?.index) {
      const notebook_id = parseInt(result.draggableId.split('-')[1])
      update({ id: notebook_id, rank: result.destination!.index })
    }
  }

  const sorted = notebooks.sort((a, b) => a.rank - b.rank)
  const previews = sorted.map((n, index) => <NotebookPreview index={index} key={`notebook-${n.id}`} notebook={n} editMode={editMode} />)
  return (
    <DragDropContext onDragStart={onDragStart} onDragEnd={onDragEnd} >
      <Droppable droppableId='notebooks'>
        {provided => (
          <div className='w-full max-w-screen-sm mx-auto h-fit flex flex-col gap-4 items-center'
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
            {previews.length > 0
              ? previews
              : <span>no notebooks yet.. try creating one</span>
            }
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  )
};

export default Notebooks;
