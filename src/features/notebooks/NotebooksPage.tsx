import React, { useState } from 'react';

import { ImBooks } from 'react-icons/im';
import { MdAddBox, MdSearch } from 'react-icons/md';
import { MdCancel } from 'react-icons/md';

import { useAppSelector } from '../../hooks/store';
import { useFetchNotebooksQuery, useUpdateNotebookMutation } from '../../app/services/notebooks';
import { selectAllNotebooks } from '../../features/notebooks/notebooksSlice';

import { FadeInPage } from '../../components/AnimatedPages';
import NotebookPreview from './NotebookPreview';
import BottomActionBar from '../../components/BottomActionBar';
import NotebookCreate from './NotebookCreate';

const NotebooksPage: React.FC = () => {
	// fetch & select notebooks
	const { isUninitialized, isLoading } = useFetchNotebooksQuery({})
	const notebooks = useAppSelector(selectAllNotebooks)

	// handles UI (displaying create notebook form)
	const [createNotebook, setCreateNotebook] = useState(false)

	// content logic
	let content;
	if (isUninitialized || isLoading) {
		content = <span>loading</span>
	} else {
		if (notebooks.length > 0) {
			const sortedNotebooks = notebooks.sort((a, b) => a.rank - b.rank)
			content = sortedNotebooks.map(n => <NotebookPreview key={n.id} notebook={n} />)
		} else {
			content = <span>empty</span>
		}
	}

	return (
		<FadeInPage>
			<div className='max-w-screen-sm mx-auto w-full flex flex-col py-8 pb-20 px-6 gap-8 text-sm sm:text-base'>
				{/* Page Heading */}
				<div className='flex flex-row gap-2 items-center text-nord3 dark:text-nord4'>
					<ImBooks size={32} />
					<span className='text-2xl'>Notebooks</span>
				</div>
				{createNotebook ? <NotebookCreate display={createNotebook} /> : null}
				{/* Notebooks Previews */}
				<div className='w-full h-fit flex flex-col gap-4 sm:grid sm:grid-cols-2'>
					{content}
				</div>
			</div>

			<BottomActionBar back='/'>
				<button className='btn-nav'
					onClick={() => setCreateNotebook(!createNotebook)}
				>
					{createNotebook
						? <MdCancel className='w-6 h-6 sm:w-8 sm:h-8' />
						: <MdAddBox className='w-6 h-6 sm:w-8 sm:h-8' />
					}
				</button>
				<button className='btn-nav'>
					<MdSearch className='w-6 h-6 sm:w-8 sm:h-8' />
				</button>
			</BottomActionBar>
		</FadeInPage>
	)
};

export default NotebooksPage;
