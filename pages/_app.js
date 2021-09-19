import React from 'react';
import { Provider } from 'react-redux';

import store from '../redux/store';

// components
import Layout from '../components/Wrappers/Layout/Layout';
import AuthProvider from '../containers/AuthProvider/AuthProvider';

import '../styles/index.scss';

function MyApp({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <AuthProvider>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </AuthProvider>
    </Provider>
  );
}

export default MyApp;
