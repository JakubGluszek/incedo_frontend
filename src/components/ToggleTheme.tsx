import React, { useContext } from 'react';
import { ThemeContext } from '../contexts/ThemeContext';

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
    <button onClick={() => toggle()}>
      {
        theme === 'dark'
          ? <span>Light</span>
          : <span>Dark</span>
      }
    </button>
  )
}

export default ToggleTheme;
