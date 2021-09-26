import React from 'react';
import { useSelector } from 'react-redux';

// components
import GlobalLoader from '../../components/UI/GlobalLoader/GlobalLoader';

const TooltipsProvider = ({ children }) => {
  const authLoading = useSelector((state) => state.auth.authLoading);

  const globalLoading = authLoading;

  return (
    <>
      {globalLoading && <GlobalLoader />}
      {children}
    </>
  );
};

export default TooltipsProvider;
