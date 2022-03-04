import React from 'react';
import { ToastContainer, toast as toastCall } from 'react-toastify';
import { useSelector } from 'react-redux';

// components
import GlobalLoader from '../../components/UI/GlobalLoader/GlobalLoader';
import Modal from '../../components/UI/Modal/Modal';

import 'react-toastify/dist/ReactToastify.css';

export const toast = {
  errorMessage: (message) => toastCall.error(message),
  successMessage: (message) => toastCall.success(message),
  infoMessage: (message) => toastCall.info(message),
};

const TooltipsProvider = ({ children }) => {
  const authLoading = useSelector((state) => state.auth?.authLoading);
  const globalModalData = useSelector((state) => state.global_manager.global_modal_data);

  const globalLoading = authLoading;

  return (
    <>
      {globalLoading && <GlobalLoader />}
      <ToastContainer
        position='bottom-left'
        autoClose={7000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme='dark'
      />
      <Modal data={globalModalData} />
      {children}
    </>
  );
};

export default TooltipsProvider;
