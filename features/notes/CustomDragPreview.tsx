import React from "react";
import { DragLayerMonitorProps } from "@minoru/react-dnd-treeview";

import { CustomData } from "../../types";
import { TypeIcon } from "./NodeTypeIcon";

type Props = {
  monitorProps: DragLayerMonitorProps<CustomData>;
};

const CustomDragPreview: React.FC<Props> = (props) => {
  const item = props.monitorProps.item;

  return (
    <div className=''>
      <div className=''>
        <TypeIcon
          droppable={item.droppable || false}
          fileType={item?.data?.type}
        />
      </div>
      <div className=''>{item.text}</div>
    </div>
  );
};

export default CustomDragPreview;
