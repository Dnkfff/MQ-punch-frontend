import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { ToastContainer, toast as toastCall } from 'react-toastify';
import { useTypedSelector } from '../../redux/store';

// components
import GlobalLoader from '../../components/UI/GlobalLoader/GlobalLoader';
import Modal from '../../components/UI/Modal/Modal';

// functions
import { setScreenWidth } from '../../redux/reducers/GlobalManager/slice';

import 'react-toastify/dist/ReactToastify.css';

export const toast = {
  errorMessage: (message) => toastCall.error(message),
  successMessage: (message) => toastCall.success(message),
  infoMessage: (message) => toastCall.info(message),
};

const TooltipsProvider = ({ children }) => {
  const dispatch = useDispatch();
  const authLoading = useTypedSelector((state) => state.auth?.authLoading);
  const globalModalData = useTypedSelector((state) => state.global_manager.global_modal_data);

  const globalLoading = authLoading;

  useEffect(() => {
    const setNewScreenWidth = () => {
      if (window && window.innerWidth) return dispatch(setScreenWidth(window.innerWidth));
    };
    setNewScreenWidth();

    window.addEventListener('resize', setNewScreenWidth);

    return () => {
      window.removeEventListener('resize', setNewScreenWidth);
    };
  }, []);

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
