import React, { useEffect, useState } from 'react';
import { SegmentedControl } from '@mantine/core';

import { MdArrowDownward, MdArrowUpward } from 'react-icons/md';

import { useAppSelector } from '../../hooks/store';
import { selectAllNotebooks } from './notebooksSlice';
import NotebooksList from './NotebooksList';

type Sort = 'rank' | 'created' | 'edited'

interface Props {
  editMode: boolean
};

const Notebooks: React.FC<Props> = ({ editMode }) => {
  const notebooks = useAppSelector(selectAllNotebooks);

  const [reverse, setReverse] = useState(false);
  const [sort, setSort] = useState<Sort>('rank')

  useEffect(() => {
    if (editMode) {
      setSort('rank')
      setReverse(false);
    };
  }, [editMode])

  let sorted;
  switch (sort) {
    case 'created':
      sorted = notebooks.sort((a, b) => a.created_at - b.created_at);
      break;
    case 'edited':
      sorted = notebooks.sort((a, b) => b.edited_at - a.edited_at);
      break;
    default:
      sorted = notebooks.sort((a, b) => a.rank - b.rank)
      break;
  };

  if (reverse) {
    sorted = sorted.reverse();
  };

  return (
    <>
      {/* sorting section */}
      <div className='w-full max-w-sm mx-auto h-fit flex flex-row items-center justify-between gap-4'>
        <SegmentedControl
          classNames={{
            root: 'dark:bg-nord0 flex flex-row flex-wrap',
            active: 'bg-white dark:bg-nord1',
            label: 'text-nord0 dark:text-white',
          }}
          styles={{
            control: {borderWidth: '0px !important'}
          }}
          value={sort}
          onChange={(value: Sort) => setSort(value)}
          data={[
            { label: 'My order', value: 'rank' },
            { label: 'Creation date', value: 'created' },
            { label: 'Most recent', value: 'edited' }
          ]}
        />
        <button className='rounded-md h-full p-1 bg-transparent hover:bg-nord8 text-nord7 border-2 border-nord7 hover:border-nord8 hover:text-nord6 dark:hover:text-dark_bg'
          onClick={() => setReverse(!reverse)}>
          {reverse
            ? <MdArrowUpward size={24} />
            : <MdArrowDownward size={24} />
          }
        </button>
      </div>

      <NotebooksList notebooks={sorted} editMode={editMode} />
    </>
  )
};

export default Notebooks;
