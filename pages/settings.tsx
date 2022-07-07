import Layout from '../components/Layout';
import { NextPageWithLayout } from '../types';

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
