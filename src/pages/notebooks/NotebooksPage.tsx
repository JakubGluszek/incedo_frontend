import React, { useState } from 'react';
import { ImBook, ImBooks, ImFileText2 } from 'react-icons/im';
import { MdKeyboardBackspace, MdAddBox, MdSearch } from 'react-icons/md';
import { TiArrowRight } from 'react-icons/ti';
import { useNavigate } from 'react-router-dom';
import BottomNav from '../../components/BottomNav';
import { AnimatedPage } from '../../components/layouts/AnimatedPages';

interface INotebook {
	id: number,
	label: string,
	about: null,
	rank: number
}

const NotebooksPage: React.FC = () => {
	const [notebooks] = useState(
		new Array(60).fill(null).map((e, i) => ({
			id: i + 1,
			label: `${i} notebook`,
			rank: i,
			about: null
		}))
	)
	const navigate = useNavigate()

	const sortedNotebooks = notebooks.sort((a, b) => a.rank - b.rank)
	const previews = sortedNotebooks.map(n => <NotebookPreview key={n.id} notebook={n} />)

	return (
		<AnimatedPage>
			<div className='max-w-screen-sm mx-auto w-full flex flex-col py-8 pb-20 px-6 gap-8 text-sm sm:text-base'>
				<div className='flex flex-row gap-2 items-center text-nord3 dark:text-nord4'>
					<ImBooks size={32} />
					<span className='text-2xl'>Notebooks</span>
				</div>
				<div className='w-full h-fit flex flex-col gap-4 sm:grid sm:grid-cols-2'>
					{previews}
				</div>
			</div>

			<BottomNav>
				<button className='btn-nav' onClick={() => navigate('/')}>
					<MdKeyboardBackspace className='w-6 h-6 sm:w-8 sm:h-8' />
				</button>
				<button className='btn-nav'>
					<MdAddBox className='w-6 h-6 sm:w-8 sm:h-8' />
				</button>
				<button className='btn-nav'>
					<MdSearch className='w-6 h-6 sm:w-8 sm:h-8' />
				</button>
			</BottomNav>
		</AnimatedPage>
	)
};

interface Props {
	notebook: INotebook
}

const NotebookPreview: React.FC<Props> = ({ notebook }) => {
	const [notes] = useState(
		new Array(10).fill(null).map((e, i) => ({
			id: i + 1,
			label: `${i} note ASD ASD ASasd`,
			rank: i,
			notebook_id: 1
		}))
	)
	const navigate = useNavigate();

	const tryNavigate = (to: string) => {
    if (window.innerWidth <= 640) {
      navigate(to)
    }
  }

	const notesPeviews = notes.map(note => (
		<div key={note.id} className='w-fit h-fit flex flex-row items-center gap-1 text-nord2 dark:text-nord6'>
			<ImFileText2 className='w-4 h-4' />
			<span className='whitespace-nowrap text-sm'>{note.label}</span>
		</div>
	))

	return (
		<section className='w-full h-fit flex flex-col p-2 gap-2 hover:cursor-pointer sm:hover:cursor-default bg-white dark:bg-nord0 rounded-md hover:shadow-md'
			onClick={() => tryNavigate(`/notebooks/${notebook.id}`)}
		>
			<div className='w-fit h-fit flex flex-row items-center gap-2'>
				<ImBook size={32} />
				<span className='text-xl'>{notebook.label}</span>
			</div>
			<div className='w-full h-fit flex flex-row gap-8'>
				<div className='grow flex flex-row p-1 items-center gap-2 overflow-x-scroll scrollbar-hide'>
					{notesPeviews}
				</div>
				<button className='hidden w-16 sm:flex items-center justify-center btn-nav bg-nord9 text-white hover:bg-nord10 dark:text-nord0 dark:hover:bg-nord10'
					onClick={() => navigate(`/notebooks/${notebook.id}`)}
					aria-label='Navigate to "notebook" page'
				>
					<TiArrowRight size={24} />
				</button>
			</div>
		</section>
	)
};

export default NotebooksPage;
