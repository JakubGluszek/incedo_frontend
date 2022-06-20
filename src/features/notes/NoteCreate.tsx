import { Transition } from '@tailwindui/react';
import React, { useEffect, useRef } from 'react';
import { Resolver, useForm } from 'react-hook-form';

import { ImFileText2 } from 'react-icons/im';
import { useNavigate } from 'react-router-dom';
import { useCreateNoteMutation } from '../../app/services/notes';
import useScrollTo from '../../hooks/useScrollTo';
import { INote } from './interfaces';

type FormValues = {
  label: string;
};

const resolver: Resolver<FormValues> = async (values) => {
  return {
    values: values.label ? values : {},
    errors: {}
  };
};

interface Props {
  notebook_id: number,
  display: boolean,
  setDisplay: (display: boolean) => void
}

const NoteCreate: React.FC<Props> = ({ display, setDisplay, notebook_id }) => {
  const { register, handleSubmit } = useForm<FormValues>({ resolver });
  const [create] = useCreateNoteMutation();
  const navigate = useNavigate();

  const onSubmit = handleSubmit(async (data) => {
    try {
      const payload: INote = await create({ ...data, notebook_id }).unwrap()
      setDisplay(false)
      navigate(`/notebooks/${notebook_id}/${payload.id}`)

    } catch (error) {
      console.log(error)
    }
  });

  const [, scrollTo] = useScrollTo();
  useEffect(() => {
    if (display) {
      scrollTo(0);
    }
  }, [display])

  return (
    <Transition
      show={display}
      enter="transition-all duration-300"
      enterFrom="opacity-0 scale-90 translate-x-16"
      enterTo="opacity-100 scale-100"
      leave="transition-all duration-300"
      leaveFrom="opacity-100"
      leaveTo="opacity-0 scale-90"
    >
      <div className='w-full h-fit flex flex-col gap-2 bg-white dark:bg-nord0 p-4 sm:p-8 rounded-md'>
        <div className='w-full h-fit flex flex-row gap-2 items-center'>
          <ImFileText2 size={32} />
          <h3>Create Note</h3>
        </div>
        <form onSubmit={onSubmit}>
          <label htmlFor='label'>Label</label>
          <input
            id='label'
            type='text'
            {...register('label')}
          />
          <input type='submit' className='submit' value={'Create'} />
        </form>
      </div>
    </Transition>
  )
};

export default NoteCreate;
