import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useTypedSelector } from '../../redux/store';

import { PRIVATE_ROUTES } from 'services/constants/constants';

interface IRouterGuard {
  children: React.ReactNode;
}

const RouterGuard: React.FC<IRouterGuard> = ({ children }) => {
  const router = useRouter();
  const isUserLoggedIn = !!useTypedSelector((state) => state.auth.user?.token);
  const [allowRendering, setAllowRendering] = useState(false);

  const checkUrl = () => {
    const url = router.asPath;
    if (window.localStorage.getItem('user')) {
      return setAllowRendering(true);
    }

    if (!isUserLoggedIn) {
      const isUrlPrivate = !!PRIVATE_ROUTES.find((route) => url.startsWith(route));
      setAllowRendering(isUrlPrivate ? false : true);
      if (isUrlPrivate) {
        router.push({
          pathname: '/',
        });
      }
    } else {
      setAllowRendering(true);
    }
  };

  useEffect(() => {
    checkUrl();
  }, [router.pathname, isUserLoggedIn]);

  return <>{allowRendering && children}</>;
};

export default RouterGuard;
