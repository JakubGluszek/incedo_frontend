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
import useNotesTree from "./useNotesTree";

const NoteTree: React.FC = () => {
  const { treeData, handleDrop } = useNotesTree();

  return (
    <DndProvider backend={MultiBackend} options={getBackendOptions()}>
      <Tree
        classes={{
          container: 'w-full overflow-y-auto max-h-96 flex flex-col py-2 gap-1 relative',
          listItem: 'w-fit'
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
