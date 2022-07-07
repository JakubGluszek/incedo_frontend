import React, { useEffect } from "react";
import { DndProvider } from "react-dnd";
import {
  Tree,
  NodeModel,
  MultiBackend,
  getBackendOptions
} from "@minoru/react-dnd-treeview";
import { CustomData } from "../../types";
import { useAppSelector } from "../../hooks/store";
import { selectAllNotes } from "./notesSlice";
import { selectAllNoteFolders } from "./noteFoldersSlice";
import NoteTreeNode from "./NoteTreeNode";


const NoteTree: React.FC = () => {
  const noteFolders = useAppSelector(selectAllNoteFolders);
  const notes = useAppSelector(selectAllNotes);

  const [treeData, setTreeData] = React.useState<NodeModel<CustomData>[]>([]);
  const handleDrop = (newTree: NodeModel<CustomData>[]) => {
    console.log(newTree)
    setTreeData(newTree)
  };

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
    console.log(nodes)
  }, [notes, noteFolders])

  return (
    <DndProvider backend={MultiBackend} options={getBackendOptions()}>
      <div className='p-4 bg-neutral'>
        <Tree
          tree={treeData}
          rootId={0}
          render={(
            node: NodeModel<CustomData>,
            { depth, isOpen, onToggle }
          ) => (
            <NoteTreeNode
              node={node}
              depth={depth}
              isOpen={isOpen}
              onToggle={onToggle}
            />
          )}
          onDrop={handleDrop}
        />
      </div>
    </DndProvider>
  );
}

export default NoteTree;
