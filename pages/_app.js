import React from 'react';
import { Provider } from 'react-redux';

import store from '../redux/store';

// components
import Layout from '../components/Wrappers/Layout/Layout';
import AuthProvider from '../containers/AuthProvider/AuthProvider';
import TooltipsProvider from '../containers/TooltipsProvider/TooltipsProvider';

import '../styles/index.scss';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

function MyApp({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <AuthProvider>
        <TooltipsProvider>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </TooltipsProvider>
      </AuthProvider>
    </Provider>
  );
}

export default MyApp;
