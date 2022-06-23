import React from 'react';
import { useSelector } from 'react-redux';
import { ToastContainer } from 'react-toastify';

// components
//import Loader from '../../visuals/loader/Loader';

import 'react-toastify/dist/ReactToastify.css';
//import './toast.scss';

const ToastLoadProvider = ({ children }) => {
  // const loader = useSelector((state) => state.app_manager.loaderState);

  return (
    <>
      {/*<Loader state={loader} />*/}
      <ToastContainer
        position='bottom-right'
        autoClose={5000}
        hideProgressBar
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        theme={'dark'}
        pauseOnHover={false}
      />
      {children}
    </>
  );
};

export default ToastLoadProvider;