import { NextPageWithLayout } from '../types';
import Layout from '../components/Layout';

const Settings: NextPageWithLayout = () => {
  return (
    <div>
      <h1>Settings page</h1>
    </div>
  )
};

Settings.getLayout = page => (
  <Layout>
    {page}
  </Layout>
)

export default Settings;
