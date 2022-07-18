import React from 'react';
import { useRouter } from 'next/router';
import { showNotification } from '@mantine/notifications';
import { useForm } from 'react-hook-form';

import { useCreateNoteMutation } from '../../app/services/notes';

const NoteCreate: React.FC = () => {
  const [createNote] = useCreateNoteMutation();
  const { register, handleSubmit } = useForm();
  const router = useRouter();

  const onSubmit = handleSubmit(async data => {
    try {
      const { id } = await createNote({ label: data.label }).unwrap()
      showNotification({
        title: 'Success',
        color: 'green',
        message: `Note created`,
        autoClose: 2000,
        classNames: {
          root: 'notification',
          title: 'text-base-content'
        }
      })
      router.push(`/notes/${id}`)
    } catch (error) {
      showNotification({
        title: 'Error',
        message: `Something went wrong, try again`,
        autoClose: 1400,
        classNames: {
          root: 'notification',
          title: 'text-base-content'
        }
      })
    }
  })

  return (
    <div className='grow flex flex-row items-center animate-in slide-in-from-bottom-10 md:slide-in-from-top-10'>
      <form
        className='w-full form-control gap-4 flex-row md:flex-col items-center'
        onSubmit={onSubmit}
      >
        <label className='input-group input-group-sm md:input-group-md'>
          <span className='label-text'>Title</span>
          <input
            autoFocus
            className='w-full input input-sm input-bordered'
            type='text'
            maxLength={64}
            {...register('label', { required: true })}
          />
        </label>
        <input
          type='submit'
          value='Create'
          className='btn btn-primary btn-sm w-24 ml-auto'
        />
      </form>
    </div>
  )
};

export default NoteCreate;
