import React from 'react';
import { AnimatedPage } from '../components/layouts/AnimatedPages';

const IndexPage: React.FC = () => {
  return (
    <AnimatedPage>
      <div className='max-w-screen-sm w-full mx-auto h-fit flex flex-col py-8 px-6 gap-4 text-sm sm:text-base'>
        <h1>Public Index Page</h1>
      </div>
    </AnimatedPage>
  )
};

export default IndexPage;
