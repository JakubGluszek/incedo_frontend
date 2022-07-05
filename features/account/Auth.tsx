import React, { useState } from 'react';

import SendToken from './SendToken';
import SignIn from './SignIn';

interface Props {
  token: string | string[] | undefined
}

const Auth: React.FC<Props> = ({ token }) => {
  const [enterToken, setEnterToken] = useState(false);

  return (
    <div className='w-full h-fit bg-base-100 p-4 flex flex-col gap-2 border-2 rounded-md border-base-200'>
      {enterToken || token
        ? <SendToken token={token} setDisplay={setEnterToken} />
        : <SignIn setEnterToken={setEnterToken} />
      }
    </div>
  )
};

export default Auth;
