import React from 'react';
import AceEditor from 'react-ace';

import "ace-builds/src-noconflict/mode-markdown";
import "ace-builds/src-noconflict/theme-nord_dark";

interface Props {
  onChange: (v: string) => void,
  body: string
}

const TextEditor: React.FC<Props> = ({ onChange, body }) => {
  return (
    <AceEditor
      style={{
        width: '100%',
        height: '100%'
      }}
      theme={'nord_dark'}
      fontSize={16}
      mode="markdown"
      defaultValue={body}
      onChange={onChange}
      name="text_editor"
      showGutter={false}
      setOptions={{
        showPrintMargin: false,
      }}
    />
  )
};

export default TextEditor;
