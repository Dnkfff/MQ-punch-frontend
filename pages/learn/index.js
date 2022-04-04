import React, { useEffect } from 'react';
import Router from 'next/router';
import { GUIDE_URL } from '../../inside-services/constants/constants';


const redirect = () => {
  Router.push('/', undefined, { shallow: true });
  window.open(GUIDE_URL);
};
const Learn = () => {

  useEffect(() => {
    redirect();
  }, []);

  return <></>;
};

export default Learn;

