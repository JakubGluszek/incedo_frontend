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

  return (
    <button name='Toggle Theme' onClick={() => toggle()}>
      {
        theme === 'dark'
          ? <MdLightMode size={24} />
          : <MdDarkMode size={24} />
      }
    </button>
  )
}

export default ToggleTheme;
