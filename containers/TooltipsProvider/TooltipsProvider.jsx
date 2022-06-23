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
import ReactDOMServer from 'react-dom/server';
import reactHtmlRender from 'react-render-html';

const Msg = ({ message }) => {
  return reactHtmlRender(ReactDOMServer.renderToString(message));
};

const errorMsg = (message) => {

  const messy = (
    <div>
      <div className={'toast-title'}>{message?.title || 'ERROR'}</div>
      <div
        className={'toast-content'}>{message?.content || 'It is not working'}
      </div>
    </div>);

  toastCall.error(<Msg message={messy} />, {
    style: { backgroundColor: '#8f1d1d' },
    theme: 'dark',
    position: 'bottom-right',
    autoClose: 5000,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: false,
    draggable: true,
    progress: undefined
  });
};
const infoMsg = (message) => {

  const messy = (
    <div>
      <div className={'toast-title'}>{message.title || 'Error'}</div>
      <div
        className={'toast-content'}>{message?.content || 'It is not working'}
      </div>
    </div>);
//{/* <a style={{ textDecoration: 'none' }} href={'google.com'}>zxcasd</a>*/}
  toastCall(<Msg message={messy} />, {
    style: { backgroundColor: '#252830' },
    theme: 'dark',
    position: 'bottom-right',
    autoClose: 5000,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: false,
    draggable: true,
    progress: undefined
  });
};

export const toast = {
  errorMessage: (message) => errorMsg(message),
  successMessage: (message) => toastCall.success(message),
  infoMessage: (message) => infoMsg(message)
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
