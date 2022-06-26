import React from 'react';

import ActionBar from '../components/ActionBar';
import { AnimatedPage } from '../components/AnimatedPage';

interface Props {
  children: React.ReactNode,
  actions: React.ReactNode
};

const FeatureLayout: React.FC<Props> = ({ children, actions }) => {
  return (
    <AnimatedPage>
      <div className='wrapper-sm flex flex-col gap-4 pb-20 md:pb-2 overflow-x-hidden'>
        {children}
      </div>
      <ActionBar>
        {actions}
      </ActionBar>
    </AnimatedPage>
  )
};

export default FeatureLayout;
