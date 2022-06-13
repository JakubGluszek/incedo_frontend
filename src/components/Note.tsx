import React, { useContext } from 'react';
import ReactCodeMirror from '@uiw/react-codemirror';
import { markdown, markdownLanguage } from "@codemirror/lang-markdown";
import { languages } from "@codemirror/language-data";
import { lightNordTheme, darkNordTheme } from '../themes/noteTheme';
import { ThemeContext } from '../contexts/ThemeContext';

interface Props {
  body: string,
  setBody: (body: string) => void
}

const Note: React.FC<Props> = ({ body, setBody }) => {
  const { theme } = useContext(ThemeContext)!;

  return (
    <ReactCodeMirror
      value={body}
      theme={theme === 'light' ? lightNordTheme : darkNordTheme}
      extensions={[
        markdown({ base: markdownLanguage, codeLanguages: languages })
      ]}
      onChange={setBody}
    />
  )
};

export default Note;
