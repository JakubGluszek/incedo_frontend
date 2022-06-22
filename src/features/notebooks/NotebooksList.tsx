import React from 'react';
import { useDispatch } from 'react-redux';
import { motion } from 'framer-motion';
import { DragDropContext, Droppable, DropResult } from 'react-beautiful-dnd';

import { useUpdateNotebooksRanksMutation } from '../../app/services/notebooks';
import { IStateNotebook } from './interfaces';
import NotebookPreview from './NotebookPreview';
import { notebooksActions } from './notebooksSlice';

interface Props {
  notebooks: IStateNotebook[],
  editMode: boolean
}

const NotebooksList: React.FC<Props> = ({ notebooks, editMode }) => {
  const [update] = useUpdateNotebooksRanksMutation();
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

  const previews = notebooks.map(n => <NotebookPreview key={n.id} notebook={n} editMode={editMode} />)

  return (
    <DragDropContext onDragStart={onDragStart} onDragEnd={onDragEnd}>
      <Droppable droppableId='notebooks'>
        {provided => (
          <motion.div className='w-full h-fit flex flex-col space-y-4 bg-light_nord0 dark:bg-nord0 rounded-md p-2 sm:p-4 md:p-6'
            ref={provided.innerRef}
            {...provided.droppableProps}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4 }}
          >
            {previews.length > 0
              ? previews
              : <span>no notebooks yet.. try creating one</span>
            }
            {provided.placeholder}
          </motion.div>
        )}
      </Droppable>
    </DragDropContext>
  )
};

export default NotebooksList;
