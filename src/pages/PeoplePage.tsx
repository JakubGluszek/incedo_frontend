import React from 'react';
import { FadeInPage } from '../components/AnimatedPage';

const PeoplesPage: React.FC = () => {
  return (
    <FadeInPage>
      <div className='max-w-screen-sm w-full mx-auto h-fit flex flex-col py-8 px-6 gap-4 text-sm sm:text-base'>
        <h1 className='h-screen flex items-center justify-center'>Peoples Page</h1>
      </div>
    </FadeInPage>
  )
};

export default PeoplesPage;
