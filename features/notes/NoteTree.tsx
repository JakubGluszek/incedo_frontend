import React from "react";
import { DndProvider } from "react-dnd";
import {
  Tree,
  NodeModel,
  MultiBackend,
  getBackendOptions
} from "@minoru/react-dnd-treeview";

import { CustomData } from "../../types";
import NoteTreeNode from "./NoteTreeNode";
import CustomDragPreview from "./CustomDragPreview";
import { Placeholder } from "./Placeholder";
import useNotesTree from "../../hooks/useNotesTree";

const NoteTree: React.FC = () => {
  const { treeData, handleDrop } = useNotesTree();
  
  return (
    <DndProvider backend={MultiBackend} options={getBackendOptions()}>
      <Tree
        canDrag={(node) => {
          console.log(node)
          return false
        }}
        classes={{
          container: 'w-full overflow-auto bg-base-200 max-h-96 flex flex-col p-2 gap-1 relative rounded-md',
          listItem: 'w-fit scrollbar-hide'
        }}
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
        dragPreviewRender={(monitorProps) => (
          <CustomDragPreview monitorProps={monitorProps} />
        )}
        sort={false}
        insertDroppableFirst={false}
        onDrop={handleDrop}
        canDrop={(tree, { dragSource, dropTargetId, dropTarget }) => {
          if (dropTarget?.droppable && dragSource?.id !== dropTargetId) {
            if (!dragSource?.droppable && dropTarget === undefined) {
              return false
            }
            return true;
          }
        }}
        dropTargetOffset={2}
        placeholderRender={(node, { depth }) => (
          <Placeholder node={node} depth={depth} />
        )}
      />
    </DndProvider>
  );
}

export default NoteTree;
