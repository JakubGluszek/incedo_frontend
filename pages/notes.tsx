import Layout from '../components/Layout';
import { NextPageWithLayout } from '../types';

const Notes: NextPageWithLayout = () => {
  return (
    <div>
      <h1>notes here</h1>
    </div>
  )
};

Notes.getLayout = page => (
  <Layout>
    {page}
  </Layout>
)

export default Notes;
