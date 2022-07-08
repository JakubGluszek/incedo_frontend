import { NodeModel, useDragOver } from "@minoru/react-dnd-treeview";
import { RiArrowRightSFill, RiArrowDownSFill } from "react-icons/ri";
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
      className='h-10 w-full flex flex-row items-center gap-1'
      style={{ paddingInlineStart: data?.type === 'note' ? indent + 16 : indent }}
      {...dragOverProps}
    >
      <div
        className=''
      >
        {props.node.droppable && (
          <div onClick={handleToggle}>
            {props.isOpen
              ? <RiArrowDownSFill />
              : <RiArrowRightSFill />
            }
          </div>
        )}
      </div>
      <div>
        <TypeIcon droppable={droppable || false} fileType={data?.type} />
      </div>
      <div className=''>
        <span>{props.node.text}</span>
      </div>
    </div>
  );
};

export default NoteTreeNode;
