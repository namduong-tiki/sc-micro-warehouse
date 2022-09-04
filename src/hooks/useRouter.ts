import { useHistory } from 'react-router-dom';
import { useCallback } from 'react';

type LocationDescriptor = {
  pathname: string;
  query: Record<string, any>;
};

type Path = string;

const useRouter = () => {
  const history = useHistory();

  const push = useCallback(
    (location: Path | LocationDescriptor) => {
      if (typeof location === 'string') {
        history.push(location);
      } else {
        const params = Object.entries(location.query).reduce((acc, current) => {
          const [key, value] = current;
          acc[key] = String(value);

          return acc;
        }, {} as Record<string, string>);

        const searchParams = new URLSearchParams(params);

        history.push({ pathname: location.pathname, search: searchParams.toString() });
      }
    },
    [history]
  );

  const replace = useCallback(
    (location: Path | LocationDescriptor) => {
      if (typeof location === 'string') {
        history.replace(location);
      } else {
        const params = Object.entries(location.query).reduce((acc, current) => {
          const [key, value] = current;
          acc[key] = String(value);

          return acc;
        }, {} as Record<string, string>);

        const searchParams = new URLSearchParams(params);

        history.replace({ pathname: location.pathname, search: searchParams.toString() });
      }
    },
    [history]
  );

  return {
    goBack: history.goBack,
    goForward: history.goForward,
    go: history.go,
    push: push,
    replace: replace,
  };
};

export default useRouter;
