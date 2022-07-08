import Layout from '../../components/Layout';
import { NextPageWithLayout } from '../../types';

const SharedNotes: NextPageWithLayout = () => {
  return (
    <div>
      <h1>shared notes</h1>
    </div>
  )
};

SharedNotes.getLayout = page => (
  <Layout>
    {page}
  </Layout>
)

export default SharedNotes;
