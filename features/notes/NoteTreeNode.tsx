import { NodeModel, useDragOver } from "@minoru/react-dnd-treeview";
import { MdArrowRight } from "react-icons/md";
import { CustomData } from "../../types";
import { TypeIcon } from "./NodeTypeIcon";

type Props = {
  node: NodeModel<CustomData>;
  depth: number;
  isOpen: boolean;
  onToggle: (id: NodeModel["id"]) => void;
}

const NoteTreeNode: React.FC<Props> = (props) => {
  const { id, droppable, data } = props.node;
  const indent = props.depth * 24;

  const handleToggle = (e: React.MouseEvent) => {
    e.stopPropagation();
    props.onToggle(props.node.id);
  };

  const dragOverProps = useDragOver(id, props.isOpen, props.onToggle);

  return (
    <div
      className='flex flex-row'
      style={{ paddingInlineStart: indent }}
      {...dragOverProps}
    >
      <div
        className=''
      >
        {props.node.droppable && (
          <div onClick={handleToggle}>
            <MdArrowRight />
          </div>
        )}
      </div>
      <div>
        <TypeIcon droppable={droppable!} fileType={data?.type} />
      </div>
      <div className=''>
        <span>{props.node.text}</span>
      </div>
    </div>
  );
};

export default NoteTreeNode;
