import { useEffect, useState } from 'react';

const useScrollTo = (): [number, (height: number) => void] => {
  const [scrollTop, setScrollTop] = useState(0);

  // author - https://stackoverflow.com/a/48942924/19312806
  const scrollTo = (height: number) => {
    const c = document.documentElement.scrollTop || document.body.scrollTop;
    if (c > height) {
      window.requestAnimationFrame(scrollTo.bind(scrollTo, height));
      window.scrollTo(height, c - c / 8);
    };
  };

  useEffect(() => {
    const onScroll = () => setScrollTop(window.pageYOffset)

    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, []);

  return [scrollTop, scrollTo]
};

export default useScrollTo;
