import React from 'react';
import { Provider } from 'react-redux';

import store from '../redux/store';

// components
import Layout from '../components/Wrappers/Layout/Layout';
import AuthProvider from '../containers/AuthProvider/AuthProvider';
import TooltipsProvider from '../containers/TooltipsProvider/TooltipsProvider';
import RouterGuard from '../containers/RouterGuard/RouterGuard';
import ErrorBoundary from '../containers/ErrorBoundary/ErrorBoundary';

import '../styles/index.scss';

function MyApp({ Component, pageProps }) {
  return (
    <ErrorBoundary>
      <Provider store={store}>
        <AuthProvider>
          <TooltipsProvider>
            <Layout>
              <RouterGuard>
                <Component {...pageProps} />
              </RouterGuard>
            </Layout>
          </TooltipsProvider>
        </AuthProvider>
      </Provider>
    </ErrorBoundary>
  );
}

export default MyApp;
