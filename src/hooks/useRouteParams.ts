import { useMemo } from 'react';
import { useLocation } from 'react-router-dom';

const useRouteParams = <T extends Record<string, any>>() => {
  const location = useLocation();

  const params = useMemo(() => {
    return Object.fromEntries(new URLSearchParams(location.search)) as T;
  }, [location.search]);

  return {
    pathname: location.pathname,
    params: params,
  };
};

export default useRouteParams;
