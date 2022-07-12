import { DropOptions, NodeModel } from '@minoru/react-dnd-treeview';
import { useEffect, useState } from 'react';
import { selectAllNoteFolders } from '../features/notes/noteFoldersSlice';
import { selectAllNotes } from '../features/notes/notesSlice';
import { CustomData } from '../types';
import { useAppSelector } from './store';
import { useNotesUpdateRankMutation } from '../app/services/notes';


const useNotesTree = (): {
  treeData: NodeModel<CustomData>[],
  setTreeData: (nodes: NodeModel<CustomData>[]) => void,
  handleDrop: (newTree: NodeModel<CustomData>[], ctx: DropOptions<CustomData>) => void
} => {
  const [treeData, setTreeData] = useState<NodeModel<CustomData>[]>([])
  const [notesUpdateRank] = useNotesUpdateRankMutation();

  const noteFolders = useAppSelector(selectAllNoteFolders);
  const notes = useAppSelector(selectAllNotes);

  useEffect(() => {
    let nodes: NodeModel<CustomData>[] = [];

    nodes.push(...noteFolders.map<NodeModel<CustomData>>(n => ({
      id: `folder-${n.id}`,
      parent: n.parent_id ? `folder-${n.parent_id}` : 0,
      text: n.label,
      droppable: true,
      data: {
        type: 'folder',
        rank: n.rank
      }
    })))

    nodes.push(...notes.map<NodeModel<CustomData>>(n => ({
      id: `note-${n.id}`,
      parent: `folder-${n.parent_id}`,
      text: n.label,
      droppable: false,
      data: {
        type: 'note',
        rank: n.rank
      }
    })))

    setTreeData(nodes)
  }, [notes, noteFolders])

  const handleDrop = (newTree: NodeModel<CustomData>[], ctx: DropOptions<CustomData>) => {
    // transform context into {id: number, parent_id: int | null, rank: number}
    const fileType = ctx.dragSource?.id.toString().split('-')[0]!
    const id = parseInt(ctx.dragSource?.id.toString().split('-')[1]!)
    const parent_id = ctx.dropTarget?.data?.type === 'folder' ? parseInt(ctx.dropTarget?.id.toString().split('-')[1]!) : null
    const destination = ctx.destinationIndex!

    if (fileType === 'note' && parent_id === 0) {
      return;
    }
    
    const update = { id, parent_id, type: fileType, rank: destination }
    console.log(update)
    try {
      notesUpdateRank(update).unwrap()
    } catch (error) {
      console.log(error)
    }

    setTreeData(newTree)
  }

  return {
    treeData: treeData,
    setTreeData,
    handleDrop
  }
};

export default useNotesTree;
