import React from 'react';

import ActionBar from '../components/ActionBar';
import { FadeInPage } from '../components/AnimatedPage';

interface Props {
  children: React.ReactNode,
  actions: React.ReactNode
}

const FeatureLayout: React.FC<Props> = ({ children, actions }) => {
  return (
    <FadeInPage>
      <div className='max-w-screen-md w-full mx-auto flex flex-col gap-8 px-6 pb-20 md:pb-24 overflow-x-hidden'>
        {children}
      </div>
      <ActionBar>
        {actions}
      </ActionBar>
    </FadeInPage>
  )
};

export default FeatureLayout;
