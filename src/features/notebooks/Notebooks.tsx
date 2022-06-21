import React from 'react';
import { useDispatch } from 'react-redux';
import { DragDropContext, Droppable, DropResult } from 'react-beautiful-dnd';
import { motion } from 'framer-motion';

import { useAppSelector } from '../../hooks/store';
import { useUpdateNotebooksRanksMutation } from '../../app/services/notebooks';
import { notebooksActions, selectAllNotebooks } from './notebooksSlice';
import NotebookPreview from './NotebookPreview';

interface Props {
  editMode: boolean
};

const Notebooks: React.FC<Props> = ({ editMode }) => {
  const [update] = useUpdateNotebooksRanksMutation();
  const notebooks = useAppSelector(selectAllNotebooks);
  const dispatch = useDispatch();

  const onDragStart = () => {
    if (window.navigator.vibrate) {
      window.navigator.vibrate(40);
    }
  };

  const onDragEnd = (result: DropResult) => {
    if (result.destination) {
      if (result.source.index !== result.destination?.index) {
        dispatch(notebooksActions.updateRanks(result))
  
        const notebook_id = parseInt(result.draggableId.split('-')[1])
        update({ id: notebook_id, rank: result.destination!.index })
      };
    }
  };

  var sorted = notebooks.sort((a, b) => a.rank - b.rank)
  var previews = sorted.map(n => <NotebookPreview key={n.id} notebook={n} editMode={editMode} />)

  return (
    <DragDropContext onDragStart={onDragStart} onDragEnd={onDragEnd}>
      <Droppable droppableId='notebooks'>
        {provided => (
          <motion.div className='w-full h-fit flex flex-col space-y-4'
            ref={provided.innerRef}
            {...provided.droppableProps}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4 }}
          >
            {previews.length > 0
              ? sorted.map(n => <NotebookPreview key={n.id} notebook={n} editMode={editMode} />)
              : <span>no notebooks yet.. try creating one</span>
            }
            {provided.placeholder}
          </motion.div>
        )}
      </Droppable>
    </DragDropContext>
  )
};

export default Notebooks;
