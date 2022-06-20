import React, { useState } from 'react';
import { ImBooks } from 'react-icons/im';
import { useFetchNotebooksQuery } from '../app/services/notebooks';
import FeatureLayout from '../components/FeatureLayout';
import PageHeading from '../components/PageHeading';
import NotebookPreview from '../features/notebooks/NotebookPreview';
import { selectAllNotebooks } from '../features/notebooks/notebooksSlice';
import { useAppSelector } from '../hooks/store';

const NotebooksPage: React.FC = () => {
  const actions = (
    <div>
      <h1>Action Bar here</h1>
    </div>
  )

  return (
    <FeatureLayout actions={actions}>
      <PageHeading
        icon={<ImBooks size={32} className='min-w-6 min-h-6' />}
        content={'Notebooks'}
      />
      <span>Notebooks here</span>
    </FeatureLayout>
  )
};

export default NotebooksPage;
