import React from 'react';
import { Provider } from 'react-redux';

import store from '../redux/store';
import Layout from '../components/Wrappers/Layout/Layout';

import '../styles/index.scss';

function MyApp({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </Provider>
  );
}

export default MyApp;
