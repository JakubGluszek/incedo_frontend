import React, { useContext } from 'react';
import { ThemeContext } from '../contexts/ThemeContext';
import { MdLightMode, MdDarkMode } from 'react-icons/md'

const ToggleTheme: React.FC = () => {
  const { theme, setTheme } = useContext(ThemeContext)!;

  const toggle = () => {
    if (theme === 'dark') {
      setTheme('light')
    } else {
      setTheme('dark')
    }
  }

  let content;

  if (theme === 'dark') {
    content = <MdLightMode size={32} />
  } else {
    content = <MdDarkMode size={32} />
  }

  return (
    <button className='btn-nav'
      name='Toggle Theme'
      onClick={() => toggle()}
    >
      {content}
    </button>
  )
}

export default ToggleTheme;
