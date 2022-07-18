import { showNotification } from '@mantine/notifications';

import { NextPageWithLayout } from '../types';
import Layout from '../components/Layout';
import { useDeleteAccountMutation } from '../app/services/account';

const Settings: NextPageWithLayout = () => {
  const [deleteAccount] = useDeleteAccountMutation();
  
  const handleDeleteAccount = async () => {
    try {
      await deleteAccount({}).unwrap()
      showNotification({
        title: 'Success',
        message: 'Account deleted',
        autoClose: 4000,
        classNames: {
          root: 'notification',
          title: 'text-base-content'
        }
      })
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div>
      <h1>Settings page</h1>
      <button
        className='btn btn-error'
        onClick={() => handleDeleteAccount()}
      >
        delete account
      </button>
    </div>
  )
};

Settings.getLayout = page => (
  <Layout>
    {page}
  </Layout>
)

export default Settings;
