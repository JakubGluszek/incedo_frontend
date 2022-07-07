import { MdFolder, MdNote } from "react-icons/md";

type Props = {
  droppable: boolean;
  fileType?: string;
};

export const TypeIcon: React.FC<Props> = (props) => {
  if (props.droppable) {
    return <MdFolder />;
  }

  switch (props.fileType) {
    case 'note':
      return <MdNote />;
    default:
      return null;
  }
};
