import { NavigateFunction } from 'react-router-dom';

// used to block navigate action on bigger screens
// bigger screens display a dedicated button for navigation
// whereas smaller displays use the entire component as a navigation "button"
export const tryNavigate = (navigate: NavigateFunction, to: string) => {
  if (window.innerWidth <= 640) {
    navigate(to)
  };
};
