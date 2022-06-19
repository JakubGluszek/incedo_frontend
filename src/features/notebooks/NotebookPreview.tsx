import React from 'react';
import { useNavigate } from "react-router-dom";

import { ImBook, ImFileText2 } from "react-icons/im";
import { TiArrowRight } from "react-icons/ti";

import { IStateNotebook } from "./interfaces";
import { useAppSelector } from "../../hooks/store";
import { selectNotesByNotebookId } from "../notes/notesSlice";
import { tryNavigate } from '../../utils';

interface Props {
  notebook: IStateNotebook
};

const NotebookPreview: React.FC<Props> = ({ notebook }) => {
  const { id, label } = notebook;
  const notes = useAppSelector(state => selectNotesByNotebookId(state, id));

  const navigate = useNavigate();

  let content;
  if (notes.length > 0) {
    content = notes.map(note => (
      <div key={note.id} className='w-fit h-fit flex flex-row items-center gap-1 text-nord2 dark:text-nord6'>
        <ImFileText2 className='w-4 h-4' />
        <span className='whitespace-nowrap text-sm'>{note.label}</span>
      </div>
    ))
  } else {
    content = <span>empty</span>
  }

  return (
    <section className='w-full h-fit flex flex-col p-4 gap-2 hover:cursor-pointer sm:hover:cursor-default bg-white dark:bg-nord0 rounded-md hover:shadow-md'
      onClick={() => tryNavigate(navigate, `/notebooks/${id}`)}
    >
      {/* Section Heading */}
      <div className='w-fit h-fit flex flex-row items-center gap-2'>
        <ImBook size={32} />
        <span className='text-xl'>{label}</span>
      </div>
      {/* Section Content */}
      <div className='w-full h-fit flex flex-row gap-8 items-center'>
        {/* Notes previews */}
        <div className='grow flex flex-row p-1 items-center gap-2 overflow-x-scroll scrollbar-hide'>
          {content}
        </div>

        {/* Navigate to note button */}
        <button className='hidden w-fit h-fit sm:flex items-center justify-center btn-nav bg-nord9 text-white hover:bg-nord10 dark:text-nord0 dark:hover:bg-nord10'
          onClick={() => navigate(`/notebooks/${id}`)}
          aria-label='Navigate to "notebook" page'
        >
          <TiArrowRight size={24} />
        </button>
      </div>
    </section>
  )
};

export default NotebookPreview;
