import React, { useEffect } from 'react';
import Router from 'next/router';
import { GUIDE_URL } from '../../inside-services/constants/constants';

const Learn = () => {

  useEffect(() => {
    Router.push('/', undefined, { shallow: true });
    window.open(GUIDE_URL).focus();
  }, []);

  return <></>;
};

export default Learn;

