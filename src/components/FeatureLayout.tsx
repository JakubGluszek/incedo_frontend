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
      <div className='max-w-screen-md w-full mx-auto flex flex-col gap-8 px-6'>
        {children}

        <ActionBar>
          {actions}
        </ActionBar>
      </div>
    </FadeInPage>
  )
};

export default FeatureLayout;
