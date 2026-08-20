import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useProgress } from '../context/ProgressContext';

const ScrollToTop = () => {
  const { pathname } = useLocation();
  const { completeStep, setLastVisited } = useProgress();

  useEffect(() => {
    window.scrollTo(0, 0);
    if (pathname && pathname !== '/') {
      setLastVisited(pathname);
      completeStep(pathname);
    }
  }, [pathname]);

  return null;
};

export default ScrollToTop;
