import React, { useContext } from 'react';
import { MdLightMode, MdDarkMode } from 'react-icons/md';

import { ThemeContext } from '../contexts/ThemeContext';

const ToggleTheme: React.FC = () => {
  const { theme, setTheme } = useContext(ThemeContext)!;

  const toggle = () => {
    if (theme === 'dark') {
      setTheme('light')
    } else {
      setTheme('dark')
    };
  };

  let content;

  if (theme === 'dark') {
    content = <MdLightMode size={32} />
  } else {
    content = <MdDarkMode size={32} />
  };

  return (
    <button className='btn-nav'
      aria-label='Toggle Theme'
      onClick={() => toggle()}
    >
      {content}
    </button>
  )
};

export default ToggleTheme;
