import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { showNotification } from '@mantine/notifications';
import { Modal } from '@mantine/core';
import { formatRelative, fromUnixTime, format } from 'date-fns'

import { MdDelete } from 'react-icons/md';

import { Note } from '../../types';
import { useRemoveNoteMutation } from '../../app/services/notes';

interface Props {
  note: Note
  opened: boolean,
  setOpened: (opened: boolean) => void,
}

const NoteDetails: React.FC<Props> = ({ note, opened, setOpened }) => {
  const [removeNote] = useRemoveNoteMutation();
  const [confirmDelete, setConfirmDelete] = useState(false);

  const router = useRouter();

  const handleDelete = async () => {
    if (confirmDelete) {
      try {
        await removeNote(note.id).unwrap()
        showNotification({
          title: 'Success',
          color: 'green',
          message: `Note deleted`,
          autoClose: 2000,
          classNames: {
            root: 'notification',
            title: 'text-base-content'
          }
        })
        router.push('/notes')
      } catch (error) {
        console.log(error)
      }
    } else {
      setConfirmDelete(true)
      setTimeout(() => setConfirmDelete(false), 3000)
    }
  }

  // TODO - handle timezone diff (account settings)
  const edited_at = formatRelative(fromUnixTime(note.edited_at), new Date())
  const created_at = format(fromUnixTime(note.created_at), 'MM/dd/yyyy')

  return (
    <Modal
      classNames={{
        inner: 'items-center',
        modal: 'bg-neutral text-neutral-content'
      }}
      opened={opened}
      onClose={() => setOpened(false)}
      title={note.label}
    >
      <div className='flex flex-col gap-2'>
        <span>characters: {note.body.length} / 10,000</span>
        <div className='flex flex-col'>
          <span>edited at: {edited_at}</span>
          <span>created at: {created_at}</span>
        </div>
        <button
          className='ml-auto btn btn-sm btn-error w-fit'
          onClick={() => handleDelete()}
        >
          <MdDelete size={24} />
          {confirmDelete ? <span>confirm</span> : null}
        </button>
      </div>
    </Modal>
  )
};

export default NoteDetails;
