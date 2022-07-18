import React from 'react';
import md from 'markdown-it';

interface Props {
  markdown: string
}

const TextPreview: React.FC<Props> = ({ markdown }) => {
  return (
    <div className='prose prose-xl mx-auto'>
      <div dangerouslySetInnerHTML={{ __html: md().render(markdown) }} />
    </div>
  )
};

export default TextPreview;
