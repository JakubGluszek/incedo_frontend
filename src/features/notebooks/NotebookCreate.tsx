import React, { useEffect, useRef } from 'react';
import { ImBook } from 'react-icons/im';
import { useForm } from 'react-hook-form';
import { INotebookCreate } from './interfaces';
import { useCreateNotebookMutation } from '../../app/services/notebooks';

interface Props {
  display: boolean,
  setDisplay: (display: boolean) => void
};

const NotebookCreate: React.FC<Props> = ({ display, setDisplay }) => {
  const ref = useRef<HTMLDivElement>(null);
  const { register, handleSubmit } = useForm();
  const [create] = useCreateNotebookMutation();

  const onSubmit = async (data: INotebookCreate) => {
    try {
      await create(data).unwrap()
      setDisplay(false)
    } catch (error) {
      console.log(error)
    }
  };

  useEffect(() => {
    if (ref.current) {
      ref.current.scrollIntoView({ behavior: 'smooth', block: 'center' })
    }
  }, [])

  return (
    <div ref={ref} className='w-full h-fit flex flex-col gap-2 bg-white dark:bg-nord0 p-4 sm:p-8 rounded-md'>
      <div className='w-full h-fit flex flex-row gap-2 items-center'>
        <ImBook size={32} />
        <h3>Create Notebook</h3>
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label htmlFor='label'>Label</label>
        <input
          id='label'
          type='text'
          {...register('label')}
        />
        <label htmlFor='about'>About</label>
        <textarea className='h-20'
          id='about'
          {...register('about')}
        />
        <input type='submit' className='submit' value={'Create'} />
      </form>
    </div>
  )
};

export default NotebookCreate;
