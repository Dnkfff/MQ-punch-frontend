import React from 'react';

import Layout from '../components/Wrappers/Layout/Layout';

import '../styles/index.scss';

function MyApp({ Component, pageProps }) {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}

export default MyApp;
