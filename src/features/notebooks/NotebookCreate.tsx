import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Transition } from '@tailwindui/react';

import { ImBook } from 'react-icons/im';

import { INotebookCreate } from './interfaces';
import { useCreateNotebookMutation } from '../../app/services/notebooks';
import useScrollTo from '../../hooks/useScrollTo';

interface Props {
  display: boolean,
  setDisplay: (display: boolean) => void
};

const NotebookCreate: React.FC<Props> = ({ display, setDisplay }) => {
  const [create] = useCreateNotebookMutation();
  const { register, handleSubmit, setValue } = useForm();
  const [, scrollTo] = useScrollTo();

  const onSubmit = async (data: INotebookCreate) => {
    try {
      await create(data).unwrap()
      setDisplay(false)
      setValue('label', '')
      setValue('about', '')
    } catch (error) {
      console.log(error)
    }
  };

  useEffect(() => {
    if (display) {
      scrollTo(0);
    }
  }, [display])

  return (
    <Transition
      show={display}
      enter='transition-all duration-300'
      enterFrom='opacity-0 -translate-y-16'
      enterTo='opacity-100 scale-100'
      leave='transition-all duration-150'
      leaveFrom='opacity-100'
      leaveTo='opacity-0 -translate-y-16'
    >
      <div className='w-full max-w-sm mx-auto h-fit flex flex-col gap-4 bg-white dark:bg-nord0 p-4 sm:p-8 rounded-md md:text-xl'>

        <div className='w-full h-fit flex flex-row gap-2 items-center text-nord9'>
          <ImBook size={32} />
          <h3 className='font-semibold'>Create Notebook</h3>
        </div>

        <form onSubmit={handleSubmit(onSubmit)}>
          <label htmlFor='label'>Label</label>
          <input className='text-lg'
            id='label'
            type='text'
            maxLength={32}
            {...register('label')}
          />
          <label htmlFor='about'>About</label>
          <textarea className='h-24'
            id='about'
            maxLength={256}
            {...register('about')}
          />
          <input className='submit h-12'
            type='submit'
            value={'Create'}
          />
        </form>

      </div>
    </Transition>
  )
};

export default NotebookCreate;
