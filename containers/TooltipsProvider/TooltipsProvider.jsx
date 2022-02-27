import React from 'react';
import { useSelector } from 'react-redux';

// components
import GlobalLoader from '../../components/UI/GlobalLoader/GlobalLoader';
import Modal from '../../components/UI/Modal/Modal';

const TooltipsProvider = ({ children }) => {
  const authLoading = useSelector((state) => state.auth?.authLoading);
  const globalModalData = useSelector((state) => state.global_manager.global_modal_data);

  const globalLoading = authLoading;

  return (
    <>
      {globalLoading && <GlobalLoader />}
      <Modal data={globalModalData} />
      {children}
    </>
  );
};

export default TooltipsProvider;
