import React from 'react';

interface Props {
  icon: React.ReactNode,
  content: string
}

const PageHeading: React.FC<Props> = ({ icon, content }) => {
  return (
    <div className='w-full h-12 flex flex-row items-center gap-2'>
      {icon}
      <h1>{content}</h1>
    </div>
  )
};

export default PageHeading;
