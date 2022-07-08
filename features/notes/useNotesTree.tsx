import { DropOptions, NodeModel } from '@minoru/react-dnd-treeview';
import { useEffect, useState } from 'react';
import { selectAllNoteFolders } from './noteFoldersSlice';
import { selectAllNotes } from './notesSlice';
import { CustomData } from '../../types';
import { useAppSelector } from '../../hooks/store';
import { useNotesUpdateRankMutation } from '../../app/services/notes';


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
        type: 'folder'
      }
    })))

    nodes.push(...notes.map<NodeModel<CustomData>>(n => ({
      id: `note-${n.id}`,
      parent: `folder-${n.note_folder_id}`,
      text: n.label,
      droppable: false,
      data: {
        type: 'note'
      }
    })))

    setTreeData(nodes)
  }, [notes, noteFolders])

  const handleDrop = (newTree: NodeModel<CustomData>[], ctx: DropOptions<CustomData>) => {
    // transform context into {id: number, parent_id: int | null, rank: number}
    const fileType = ctx.dragSource?.id.toString().split('-')[0]!
    const id = parseInt(ctx.dragSource?.id.toString().split('-')[1]!)
    const parent_id = ctx.dropTarget?.data?.type === 'folder' ? parseInt(ctx.dropTarget?.id.toString().split('-')[1]!) : null

    try {
      notesUpdateRank({ id, parent_id, type: fileType, rank: ctx.destinationIndex! }).unwrap()
    } catch (error) {
      console.log(error)
    }

    setTreeData(newTree)
  }

  return {
    treeData,
    setTreeData,
    handleDrop
  }
};

export default useNotesTree;
