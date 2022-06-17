import React, { useState } from 'react';
import { ImBook, ImBooks } from 'react-icons/im';
import { MdKeyboardBackspace, MdAddBox, MdSearch, MdEdit, MdArrowDownward, MdArrowUpward, MdCancel } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';
import BottomNav from '../components/BottomNav';
import { AnimatedPage } from '../components/layouts/AnimatedPages';
import { useClickOutside } from '@mantine/hooks';

interface INotebook {
	id: number,
	label: string,
	about: null,
	rank: number
}

const NotebooksPage: React.FC = () => {
	const [notebooks, setNotebooks] = useState(
		new Array(60).fill(null).map((e, i) => ({
			id: i + 1,
			label: `${i} notebook`,
			rank: i,
			about: null
		}))
	)
	const navigate = useNavigate()


	const update = (notebook: INotebook) => {
		let notebooksCopy = notebooks.filter(n => n.id !== notebook.id)
		setNotebooks([...notebooksCopy, notebook])
	}

	const sortedNotebooks = notebooks.sort((a, b) => a.rank - b.rank)
	const previews = sortedNotebooks.map(n => <NotebookPreview key={n.id} notebook={n} update={update} />)

	return (
		<>
			<AnimatedPage>
				<div className='max-w-screen-sm mx-auto w-full flex flex-col py-8 pb-20 px-6 gap-8 text-sm sm:text-base'>
					<div className='flex flex-row gap-2 items-center text-nord3 dark:text-nord4'>
						<ImBooks size={32} />
						<span className='text-2xl'>Notebooks</span>
					</div>
					<div className='w-full h-fit flex flex-col gap-4'>
						{previews}
					</div>
				</div>
			</AnimatedPage>
			<BottomNav>
				<button className='btn-nav' onClick={() => navigate('/')}>
					<MdKeyboardBackspace className='w-8 h-8 sm:w-10 sm:h-10' />
				</button>
				<button className='btn-nav'>
					<MdAddBox className='w-8 h-8 sm:w-10 sm:h-10' />
				</button>
				<button className='btn-nav'>
					<MdSearch className='w-8 h-8 sm:w-10 sm:h-10' />
				</button>
			</BottomNav>
		</>
	)
};

interface Props {
	notebook: INotebook,
	update: (notebook: INotebook) => void
}

const NotebookPreview: React.FC<Props> = ({ notebook, update }) => {
	const [canEdit, setCanEdit] = useState(false)
	const [notebookLabel, setNotebookLabel] = useState(notebook.label)
	const [newRank, setNewRank] = useState(notebook.rank)
	const ref = useClickOutside(() => setCanEdit(false));

	const handleCanEdit = (canEdit: boolean) => {
		if (isUpdate) {
			update({ ...notebook, rank: newRank, label: notebookLabel })
		}
		setCanEdit(canEdit)
	}

	const isUpdate = canEdit && (notebook.label !== notebookLabel || notebook.rank !== newRank)

	const cancel = () => {
		setNotebookLabel(notebook.label)
		setNewRank(notebook.rank)
		setCanEdit(false)
	}

	return (
		<section
			className='w-full h-fit flex flex-col p-2 gap-2 bg-white dark:bg-nord0 rounded-md hover:shadow-md'
			ref={ref}
		>
			<div className='w-full h-8 flex flex-row items-center justify-between'>
				<div className='flex flex-row items-center gap-2'>
					<ImBook size={32} />
					{canEdit
						?
						<input className='w-28'
							type='text'
							defaultValue={notebook.label}
							onChange={e => setNotebookLabel(e.currentTarget.value)}
						/>
						:
						<span>{notebook.label}</span>
					}
				</div>
				<div className='flex flex-row items-center gap-2'>
					{canEdit
						?
						<>
							<button className='btn-nav p-1 bg-nord9 dark:bg-nord9 text-white dark:text-nord0 hover:bg-nord10 hover:dark:bg-nord10'
								onClick={() => setNewRank(newRank + 1)}
							>
								<MdArrowDownward size={24} />
							</button>
							<button className='btn-nav p-1 bg-nord9 dark:bg-nord9 text-white dark:text-nord0 hover:bg-nord10 hover:dark:bg-nord10'
								onClick={() => setNewRank(newRank - 1)}
							>
								<MdArrowUpward size={24} />
							</button>
							<button className='btn-nav p-1 bg-nord9 dark:bg-nord9 text-white dark:text-nord0 hover:bg-nord10 hover:dark:bg-nord10'
								onClick={() => cancel()}
							>
								<MdCancel size={24} />
							</button>
						</>
						: null
					}
					<button className={`btn-nav p-1 ${isUpdate ? 'bg-nord7 dark:bg-nord7 hover:bg-nord8 dark:hover:bg-nord8' : 'bg-nord9 dark:bg-nord9 hover:bg-nord10 hover:dark:bg-nord10'} text-white dark:text-nord0`}
						onClick={() => handleCanEdit(!canEdit)}
					>
						<MdEdit size={24} />
					</button>
				</div>
			</div>
		</section>
	)
};

export default NotebooksPage;
