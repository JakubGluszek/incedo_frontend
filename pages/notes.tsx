import { useFetchNoteFoldersQuery } from '../app/services/noteFolders';
import { useFetchNotesQuery } from '../app/services/notes';
import Layout from '../components/Layout';
import NoteTree from '../features/notes/NoteTree';
import { NextPageWithLayout } from '../types';

const Notes: NextPageWithLayout = () => {
  useFetchNoteFoldersQuery({});
  useFetchNotesQuery({});

  return (
    <div>
      <NoteTree />
    </div>
  )
};

Notes.getLayout = page => (
  <Layout>
    {page}
  </Layout>
)

export default Notes;
