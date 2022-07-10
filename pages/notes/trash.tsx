import { NextPageWithLayout } from '../../types';
import Layout from '../../components/Layout';

const NotesTrash: NextPageWithLayout = () => {

  return (
    <div>
      <h1>notes trash</h1>
    </div>
  )
};

NotesTrash.getLayout = page => (
  <Layout>
    {page}
  </Layout>
)

export default NotesTrash;
