import React, { useEffect } from 'react';
import { useRouter } from 'next/router';

import { DEFAULT_TOURNAMENTS_SCREEN_ROUTE } from '../../inside-services/constants/constants';

const Tournaments = () => {
  const router = useRouter();

  useEffect(() => {
    router.push(DEFAULT_TOURNAMENTS_SCREEN_ROUTE);
  }, []);

  return <></>;
};

export default Tournaments;
